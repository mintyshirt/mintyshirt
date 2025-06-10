const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GroupingModule", function () {
  let registry;
  let grouping;
  let owner;
  let creator;
  let creatorId;
  let ipId;
  let designId;

  beforeEach(async function () {
    [owner, creator] = await ethers.getSigners();

    const Registry = await ethers.getContractFactory("MintyShirtRegistry");
    registry = await Registry.deploy();
    await registry.deployed();

    const GroupingModule = await ethers.getContractFactory("GroupingModule");
    grouping = await GroupingModule.deploy(registry.address);
    await grouping.deployed();

    creatorId = await registry
      .connect(creator)
      .callStatic.registerCreator(creator.address, "Creator", "uri");
    await registry
      .connect(creator)
      .registerCreator(creator.address, "Creator", "uri");

    ipId = await registry.connect(creator).callStatic.registerIPAsset(
      creatorId,
      "IP",
      "desc",
      "hash",
      "image",
      true
    );
    await registry
      .connect(creator)
      .registerIPAsset(creatorId, "IP", "desc", "hash", "image", true);

    designId = await registry.connect(creator).callStatic.registerIPAsset(
      creatorId,
      "Design",
      "desc",
      "hash2",
      "image",
      true
    );
    await registry
      .connect(creator)
      .registerIPAsset(creatorId, "Design", "desc", "hash2", "image", true);
  });

  it("devrait associer un design à une IP", async function () {
    await grouping.connect(creator).addDesignToIP(ipId, designId);
    const designs = await grouping.getDesignsForIP(ipId);
    expect(designs.map(d => d.toNumber())).to.deep.equal([designId]);
    expect(await grouping.getIPForDesign(designId)).to.equal(ipId);
  });

  it("devrait retirer l'association d'un design", async function () {
    await grouping.connect(creator).addDesignToIP(ipId, designId);
    await grouping.connect(creator).removeDesignFromIP(designId);
    const designs = await grouping.getDesignsForIP(ipId);
    expect(designs.length).to.equal(0);
    expect(await grouping.getIPForDesign(designId)).to.equal(0);
  });
});
