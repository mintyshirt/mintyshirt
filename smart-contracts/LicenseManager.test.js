const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LicenseManager", function () {
  let owner;
  let creator1;
  let licensee1;
  let other;
  let registry;
  let licenseManager;
  let creator1Id;
  let licensee1Id;
  let ipId;

  beforeEach(async function () {
    [owner, creator1, licensee1, other] = await ethers.getSigners();

    const Registry = await ethers.getContractFactory("MintyShirtRegistry");
    registry = await Registry.deploy();
    await registry.deployed();

    const Manager = await ethers.getContractFactory("LicenseManager");
    licenseManager = await Manager.deploy(registry.address);
    await licenseManager.deployed();

    creator1Id = await registry.connect(creator1).callStatic.registerCreator(
      creator1.address,
      "Creator 1",
      "uri1"
    );
    await registry
      .connect(creator1)
      .registerCreator(creator1.address, "Creator 1", "uri1");

    licensee1Id = await registry.connect(licensee1).callStatic.registerCreator(
      licensee1.address,
      "Licensee 1",
      "uri2"
    );
    await registry
      .connect(licensee1)
      .registerCreator(licensee1.address, "Licensee 1", "uri2");

    ipId = await registry.connect(creator1).callStatic.registerIPAsset(
      creator1Id,
      "Artwork",
      "desc",
      "hash",
      "image",
      true
    );
    await registry
      .connect(creator1)
      .registerIPAsset(
        creator1Id,
        "Artwork",
        "desc",
        "hash",
        "image",
        true
      );
  });

  it("devrait créer une demande de licence", async function () {
    const duration = 3600;
    const tx = await licenseManager
      .connect(licensee1)
      .createLicenseRequest(ipId, 0, "Licence", duration, 0, 500);
    await tx.wait();

    const request = await licenseManager.getLicenseRequest(1);
    expect(request.ipId).to.equal(ipId);
    expect(request.licenseeId).to.equal(licensee1Id);
    expect(request.status).to.equal(0); // PENDING
  });

  it("devrait permettre au propriétaire de l'IP d'approuver une demande", async function () {
    const duration = 3600;
    await licenseManager
      .connect(licensee1)
      .createLicenseRequest(ipId, 0, "Licence", duration, 0, 500);

    await licenseManager.connect(creator1).approveLicenseRequest(1);

    const request = await licenseManager.getLicenseRequest(1);
    expect(request.status).to.equal(1); // ACTIVE

    const license = await licenseManager.getLicense(1);
    expect(license.active).to.be.true;
    expect(license.expiryDate).to.be.gt(0);
  });

  it("devrait permettre au propriétaire de l'IP de rejeter une demande", async function () {
    await licenseManager
      .connect(licensee1)
      .createLicenseRequest(ipId, 0, "Licence", 0, 0, 500);

    await licenseManager.connect(creator1).rejectLicenseRequest(1);

    const request = await licenseManager.getLicenseRequest(1);
    expect(request.status).to.equal(2); // REJECTED
  });

  it("devrait retourner les données d'une licence", async function () {
    const duration = 3600;
    await licenseManager
      .connect(licensee1)
      .createLicenseRequest(ipId, 0, "Licence", duration, 0, 500);
    await licenseManager.connect(creator1).approveLicenseRequest(1);

    const license = await licenseManager.getLicense(1);
    expect(license.id).to.equal(1);
    expect(license.ipId).to.equal(ipId);
    expect(license.active).to.be.true;
  });
});
