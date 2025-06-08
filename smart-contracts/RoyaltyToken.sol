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
    uint256 private _tokenPrice;
    address private _platformWallet;
    uint256 private constant COMMISSION_BPS = 200; // 2%
    
    // Événements
    event RoyaltiesDistributed(uint256 amount, uint256 timestamp);
    event RoyaltyPercentageUpdated(uint256 oldPercentage, uint256 newPercentage);
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 price);
    event TokensSold(address indexed seller, uint256 amount, uint256 price);
    
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
        address registryAddress,
        uint256 tokenPrice,
        address platformWallet
    ) ERC20(name, symbol) {
        // Transférer la propriété au créateur
        _transferOwnership(creatorAddress);
        require(creatorAddress != address(0), "Adresse createur invalide");
        require(registryAddress != address(0), "Adresse registre invalide");
        require(royaltyPercentage <= 10000, "Pourcentage max 100%");
        require(platformWallet != address(0), "Adresse wallet invalide");

        _tokenPrice = tokenPrice;
        _platformWallet = platformWallet;

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
     * @dev Prix du token en wei pour une unité (1e18)
     */
    function getTokenPrice() external view returns (uint256) {
        return _tokenPrice;
    }

    /**
     * @dev Acheter des tokens
     * @param amount Montant en plus petite unité (18 décimales)
     */
    function buyTokens(uint256 amount) external payable nonReentrant {
        require(amount > 0, "Montant invalide");
        uint256 cost = (amount * _tokenPrice) / 1e18;
        require(msg.value >= cost, "Ether insuffisant");

        uint256 commission = (cost * COMMISSION_BPS) / 10000;
        payable(_platformWallet).transfer(commission);

        _mint(msg.sender, amount);

        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }

        emit TokensPurchased(msg.sender, amount, _tokenPrice);
    }

    /**
     * @dev Vendre des tokens
     * @param amount Montant en plus petite unité (18 décimales)
     */
    function sellTokens(uint256 amount) external nonReentrant {
        require(amount > 0, "Montant invalide");
        uint256 revenue = (amount * _tokenPrice) / 1e18;
        uint256 commission = (revenue * COMMISSION_BPS) / 10000;
        uint256 payout = revenue - commission;
        require(address(this).balance >= payout, "Liquidite insuffisante");

        _burn(msg.sender, amount);
        payable(_platformWallet).transfer(commission);
        payable(msg.sender).transfer(payout);

        emit TokensSold(msg.sender, amount, _tokenPrice);
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
