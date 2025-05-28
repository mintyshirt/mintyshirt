// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IRoyaltyToken.sol";
import "./interfaces/IMintyShirtRegistry.sol";

/**
 * @title RoyaltyToken
 * @dev Contrat pour les tokens de redevance sur MintyShirt
 */
contract RoyaltyToken is IRoyaltyToken, ERC20, ERC20Burnable, Ownable, ReentrancyGuard {
    // Variables d'état
    uint256 private _ipId;
    uint256 private _royaltyPercentage; // en points de base (100 = 1%)
    uint256 private _totalDistributed;
    address private _registryAddress;
    
    // Événements
    event RoyaltiesDistributed(uint256 amount, uint256 timestamp);
    event RoyaltyPercentageUpdated(uint256 oldPercentage, uint256 newPercentage);
    
    /**
     * @dev Constructeur
     * @param name Nom du token
     * @param symbol Symbole du token
     * @param initialSupply Offre initiale de tokens
     * @param creatorAddress Adresse du créateur
     * @param ipId ID de l'IP associée
     * @param royaltyPercentage Pourcentage de redevance (en points de base)
     * @param registryAddress Adresse du contrat de registre
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address creatorAddress,
        uint256 ipId,
        uint256 royaltyPercentage,
        address registryAddress
    ) ERC20(name, symbol) {
        // Transférer la propriété au créateur
        _transferOwnership(creatorAddress);
        require(creatorAddress != address(0), "Adresse createur invalide");
        require(registryAddress != address(0), "Adresse registre invalide");
        require(royaltyPercentage <= 10000, "Pourcentage max 100%");
        
        _ipId = ipId;
        _royaltyPercentage = royaltyPercentage;
        _registryAddress = registryAddress;
        
        // Vérifier que l'IP existe dans le registre
        IMintyShirtRegistry registry = IMintyShirtRegistry(registryAddress);
        IMintyShirtRegistry.IPAsset memory ipAsset = registry.getIPAsset(ipId);
        require(ipAsset.id == ipId, "IP inexistante");
        
        // Vérifier que le créateur est bien le propriétaire de l'IP
        IMintyShirtRegistry.Creator memory creator = registry.getCreator(ipAsset.creatorId);
        require(creator.creatorAddress == creatorAddress, "Createur non autorise");
        
        // Mint les tokens initiaux au créateur
        _mint(creatorAddress, initialSupply);
    }
    
    /**
     * @dev Obtenir l'ID de l'IP associée
     * @return ID de l'IP
     */
    function getIPId() external view override returns (uint256) {
        return _ipId;
    }
    
    /**
     * @dev Obtenir le pourcentage de redevance
     * @return Pourcentage de redevance (en points de base)
     */
    function getRoyaltyPercentage() external view override returns (uint256) {
        return _royaltyPercentage;
    }
    
    /**
     * @dev Distribuer les redevances aux détenteurs de tokens
     * @param amount Montant total à distribuer
     */
    function distributeRoyalties(uint256 amount) external override nonReentrant {
        require(amount > 0, "Montant doit etre positif");
        
        uint256 totalSupply = totalSupply();
        require(totalSupply > 0, "Aucun token en circulation");
        
        // Mettre à jour le total distribué
        _totalDistributed += amount;
        
        // Émettre l'événement
        emit RoyaltiesDistributed(amount, block.timestamp);
    }
    
    /**
     * @dev Mettre à jour le pourcentage de redevance
     * @param newPercentage Nouveau pourcentage de redevance (en points de base)
     */
    function updateRoyaltyPercentage(uint256 newPercentage) external override onlyOwner {
        require(newPercentage <= 10000, "Pourcentage max 100%");
        
        uint256 oldPercentage = _royaltyPercentage;
        _royaltyPercentage = newPercentage;
        
        emit RoyaltyPercentageUpdated(oldPercentage, newPercentage);
    }
    
    /**
     * @dev Obtenir le montant total distribué
     * @return Montant total distribué
     */
    function getTotalDistributed() external view override returns (uint256) {
        return _totalDistributed;
    }
    
    /**
     * @dev Obtenir le solde de tokens d'un détenteur
     * @param holder Adresse du détenteur
     * @return Solde de tokens
     */
    function getHolderBalance(address holder) external view override returns (uint256) {
        return balanceOf(holder);
    }
    
    /**
     * @dev Obtenir la part de redevance d'un détenteur
     * @param holder Adresse du détenteur
     * @return Part de redevance (en pourcentage)
     */
    function getHolderRoyaltyShare(address holder) external view override returns (uint256) {
        uint256 totalSupply = totalSupply();
        if (totalSupply == 0) return 0;
        
        return (balanceOf(holder) * 10000) / totalSupply;
    }
}
