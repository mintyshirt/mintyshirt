// Script de déploiement des smart contracts sur le testnet de Story Protocol
const { ethers } = require("hardhat");

async function main() {
  console.log("Déploiement des smart contracts sur le testnet de Story Protocol...");

  // Récupérer les comptes de déploiement
  const [deployer] = await ethers.getSigners();
  console.log(`Déploiement depuis le compte: ${deployer.address}`);
  console.log(`Balance du compte: ${ethers.utils.formatEther(await deployer.getBalance())} ETH`);

  // Déployer MintyShirtRegistry
  console.log("\nDéploiement de MintyShirtRegistry...");
  const MintyShirtRegistry = await ethers.getContractFactory("MintyShirtRegistry");
  const registry = await MintyShirtRegistry.deploy();
  await registry.deployed();
  console.log(`MintyShirtRegistry déployé à l'adresse: ${registry.address}`);

  // Déployer LicenseManager
  console.log("\nDéploiement de LicenseManager...");
  const LicenseManager = await ethers.getContractFactory("LicenseManager");
  const licenseManager = await LicenseManager.deploy(registry.address);
  await licenseManager.deployed();
  console.log(`LicenseManager déployé à l'adresse: ${licenseManager.address}`);

  // Déployer RevenueDistributor
  console.log("\nDéploiement de RevenueDistributor...");
  const platformWallet = deployer.address; // Pour les tests, utiliser l'adresse du déployeur comme wallet de la plateforme
  const platformFeePercentage = 250; // 2.5% en points de base
  const RevenueDistributor = await ethers.getContractFactory("RevenueDistributor");
  const revenueDistributor = await RevenueDistributor.deploy(platformWallet, platformFeePercentage);
  await revenueDistributor.deployed();
  console.log(`RevenueDistributor déployé à l'adresse: ${revenueDistributor.address}`);

  // Déployer TokenVerifier
  console.log("\nDéploiement de TokenVerifier...");
  const TokenVerifier = await ethers.getContractFactory("TokenVerifier");
  const tokenVerifier = await TokenVerifier.deploy();
  await tokenVerifier.deployed();
  console.log(`TokenVerifier déployé à l'adresse: ${tokenVerifier.address}`);

  // Déployer un RoyaltyToken de démonstration
  console.log("\nDéploiement de RoyaltyToken...");
  const RoyaltyToken = await ethers.getContractFactory("RoyaltyToken");
  const royaltyToken = await RoyaltyToken.deploy(
    "Royalty Token",
    "RYT",
    ethers.utils.parseEther("0"),
    deployer.address,
    1,
    500,
    registry.address,
    ethers.utils.parseEther("0.01"),
    platformWallet
  );
  await royaltyToken.deployed();
  console.log(`RoyaltyToken déployé à l'adresse: ${royaltyToken.address}`);

  console.log("\nTous les contrats ont été déployés avec succès!");
  console.log("\nRécapitulatif des adresses:");
  console.log(`- MintyShirtRegistry: ${registry.address}`);
  console.log(`- LicenseManager: ${licenseManager.address}`);
  console.log(`- RevenueDistributor: ${revenueDistributor.address}`);
  console.log(`- TokenVerifier: ${tokenVerifier.address}`);
  console.log(`- RoyaltyToken: ${royaltyToken.address}`);

  // Enregistrer les adresses dans un fichier pour référence future
  const fs = require("fs");
  const deploymentInfo = {
    network: network.name,
    timestamp: new Date().toISOString(),
    registry: registry.address,
    licenseManager: licenseManager.address,
    revenueDistributor: revenueDistributor.address,
    tokenVerifier: tokenVerifier.address,
    royaltyToken: royaltyToken.address,
  };

  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\nInformations de déploiement enregistrées dans deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
