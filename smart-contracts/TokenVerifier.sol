// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ITokenVerifier.sol";
import "./interfaces/IMintyShirtRegistry.sol";

/**
 * @title TokenVerifier
 * @dev Contrat pour la vérification de la possession de tokens pour l'accès aux fonctionnalités exclusives
 */
contract TokenVerifier is ITokenVerifier, Ownable, ReentrancyGuard {
    // Variables d'état
    mapping(address => mapping(address => TokenAccess)) private _tokenAccess; // Token address => User address => Access
    mapping(bytes32 => TokenRequirement[]) private _tokenRequirements; // Feature ID => Token requirements
    
    // Variables pour les snapshots
    mapping(uint256 => Snapshot) private _snapshots;
    mapping(uint256 => mapping(address => uint256)) private _snapshotBalances;
    uint256 private _snapshotIdCounter = 1;
    
    // Événements
    event TokenAccessVerified(address indexed tokenAddress, address indexed userAddress, bool hasAccess);
    event TokenRequirementAdded(bytes32 indexed featureId, address indexed tokenAddress, uint256 minAmount);
    event TokenRequirementRemoved(bytes32 indexed featureId, address indexed tokenAddress);
    event SnapshotCreated(uint256 indexed snapshotId, address indexed tokenAddress, uint256 timestamp);
    event BalanceRecorded(uint256 indexed snapshotId, address indexed userAddress, uint256 balance);
    
    /**
     * @dev Constructeur
     */
    constructor() {
        // Transférer la propriété au déployeur
        _transferOwnership(msg.sender);
    }
    
    /**
     * @dev Vérifier l'accès d'un utilisateur à une fonctionnalité
     * @param featureId ID de la fonctionnalité
     * @param userAddress Adresse de l'utilisateur
     * @return hasAccess L'utilisateur a-t-il accès
     */
    function verifyAccess(bytes32 featureId, address userAddress) external view override returns (bool) {
        TokenRequirement[] memory requirements = _tokenRequirements[featureId];
        
        // Si aucune exigence, accès autorisé par défaut
        if (requirements.length == 0) {
            return true;
        }
        
        // Vérifier chaque exigence
        for (uint256 i = 0; i < requirements.length; i++) {
            TokenRequirement memory req = requirements[i];
            TokenAccess memory access = _tokenAccess[req.tokenAddress][userAddress];
            
            // Si l'utilisateur a le montant minimum requis, accès autorisé
            if (access.amount >= req.minAmount && access.lastVerified + req.validityPeriod >= block.timestamp) {
                return true;
            }
        }
        
        // Aucune exigence satisfaite
        return false;
    }
    
    /**
     * @dev Mettre à jour l'accès d'un utilisateur pour un token
     * @param tokenAddress Adresse du token
     * @param userAddress Adresse de l'utilisateur
     * @param amount Montant de tokens détenus
     */
    function updateTokenAccess(address tokenAddress, address userAddress, uint256 amount) external override {
        require(tokenAddress != address(0), "Adresse token invalide");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        // Seul le propriétaire ou un vérificateur autorisé peut mettre à jour l'accès
        require(msg.sender == owner() || msg.sender == tokenAddress, "Non autorise");
        
        _tokenAccess[tokenAddress][userAddress] = TokenAccess({
            amount: amount,
            lastVerified: block.timestamp
        });
        
        emit TokenAccessVerified(tokenAddress, userAddress, amount > 0);
    }
    
    /**
     * @dev Ajouter une exigence de token pour une fonctionnalité
     * @param featureId ID de la fonctionnalité
     * @param tokenAddress Adresse du token
     * @param minAmount Montant minimum requis
     * @param validityPeriod Période de validité de la vérification en secondes
     */
    function addTokenRequirement(bytes32 featureId, address tokenAddress, uint256 minAmount, uint256 validityPeriod) external override onlyOwner {
        require(tokenAddress != address(0), "Adresse token invalide");
        require(minAmount > 0, "Montant minimum doit etre positif");
        require(validityPeriod > 0, "Periode validite doit etre positive");
        
        // Vérifier si l'exigence existe déjà
        TokenRequirement[] storage requirements = _tokenRequirements[featureId];
        for (uint256 i = 0; i < requirements.length; i++) {
            if (requirements[i].tokenAddress == tokenAddress) {
                // Mettre à jour l'exigence existante
                requirements[i].minAmount = minAmount;
                requirements[i].validityPeriod = validityPeriod;
                
                emit TokenRequirementAdded(featureId, tokenAddress, minAmount);
                return;
            }
        }
        
        // Ajouter une nouvelle exigence
        requirements.push(TokenRequirement({
            tokenAddress: tokenAddress,
            minAmount: minAmount,
            validityPeriod: validityPeriod
        }));
        
        emit TokenRequirementAdded(featureId, tokenAddress, minAmount);
    }
    
    /**
     * @dev Supprimer une exigence de token pour une fonctionnalité
     * @param featureId ID de la fonctionnalité
     * @param tokenAddress Adresse du token
     */
    function removeTokenRequirement(bytes32 featureId, address tokenAddress) external override onlyOwner {
        require(tokenAddress != address(0), "Adresse token invalide");
        
        TokenRequirement[] storage requirements = _tokenRequirements[featureId];
        for (uint256 i = 0; i < requirements.length; i++) {
            if (requirements[i].tokenAddress == tokenAddress) {
                // Supprimer l'exigence en la remplaçant par la dernière et en réduisant la longueur
                requirements[i] = requirements[requirements.length - 1];
                requirements.pop();
                
                emit TokenRequirementRemoved(featureId, tokenAddress);
                return;
            }
        }
    }
    
    /**
     * @dev Obtenir les exigences de token pour une fonctionnalité
     * @param featureId ID de la fonctionnalité
     * @return Liste des exigences de token
     */
    function getTokenRequirements(bytes32 featureId) external view override returns (TokenRequirement[] memory) {
        return _tokenRequirements[featureId];
    }
    
    /**
     * @dev Obtenir l'accès d'un utilisateur pour un token
     * @param tokenAddress Adresse du token
     * @param userAddress Adresse de l'utilisateur
     * @return Informations d'accès
     */
    function getTokenAccess(address tokenAddress, address userAddress) external view override returns (TokenAccess memory) {
        return _tokenAccess[tokenAddress][userAddress];
    }

    /**
     * @dev Vérifier si un utilisateur possède un montant minimum de tokens
     * @param tokenAddress Adresse du token
     * @param userAddress Adresse de l'utilisateur
     * @param minAmount Montant minimum requis
     * @return hasTokens L'utilisateur possède-t-il le montant minimum
     */
    function hasTokens(address tokenAddress, address userAddress, uint256 minAmount) external view override returns (bool) {
        require(tokenAddress != address(0), "Adresse token invalide");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        uint256 balance = IERC20(tokenAddress).balanceOf(userAddress);
        return balance >= minAmount;
    }
    
    /**
     * @dev Vérifier si un utilisateur possède un montant minimum de tokens d'un IP spécifique
     * @param registryAddress Adresse du registre
     * @param ipId ID de l'IP
     * @param userAddress Adresse de l'utilisateur
     * @param minAmount Montant minimum requis
     * @return hasTokens L'utilisateur possède-t-il le montant minimum
     */
    function hasTokensForIP(address registryAddress, uint256 ipId, address userAddress, uint256 minAmount) external view override returns (bool) {
        require(registryAddress != address(0), "Adresse registre invalide");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        // Obtenir l'adresse du token de redevance pour l'IP
        IMintyShirtRegistry registry = IMintyShirtRegistry(registryAddress);
        address tokenAddress = registry.getRoyaltyTokenAddress(ipId);
        
        // Si aucun token n'est lié à l'IP, retourner false
        if (tokenAddress == address(0)) {
            return false;
        }
        
        // Vérifier le solde
        uint256 balance = IERC20(tokenAddress).balanceOf(userAddress);
        return balance >= minAmount;
    }
    
    /**
     * @dev Obtenir le solde de tokens d'un utilisateur
     * @param tokenAddress Adresse du token
     * @param userAddress Adresse de l'utilisateur
     * @return balance Solde de tokens
     */
    function getTokenBalance(address tokenAddress, address userAddress) external view override returns (uint256) {
        require(tokenAddress != address(0), "Adresse token invalide");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        return IERC20(tokenAddress).balanceOf(userAddress);
    }
    
    /**
     * @dev Obtenir le solde de tokens d'un IP spécifique pour un utilisateur
     * @param registryAddress Adresse du registre
     * @param ipId ID de l'IP
     * @param userAddress Adresse de l'utilisateur
     * @return balance Solde de tokens
     */
    function getTokenBalanceForIP(address registryAddress, uint256 ipId, address userAddress) external view override returns (uint256) {
        require(registryAddress != address(0), "Adresse registre invalide");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        // Obtenir l'adresse du token de redevance pour l'IP
        IMintyShirtRegistry registry = IMintyShirtRegistry(registryAddress);
        address tokenAddress = registry.getRoyaltyTokenAddress(ipId);
        
        // Si aucun token n'est lié à l'IP, retourner 0
        if (tokenAddress == address(0)) {
            return 0;
        }
        
        // Obtenir le solde
        return IERC20(tokenAddress).balanceOf(userAddress);
    }
    
    /**
     * @dev Vérifier si un utilisateur possède des tokens pour plusieurs IPs
     * @param registryAddress Adresse du registre
     * @param ipIds Liste des IDs d'IP
     * @param minAmounts Liste des montants minimums requis
     * @param userAddress Adresse de l'utilisateur
     * @return hasTokens L'utilisateur possède-t-il tous les montants minimums
     */
    function hasTokensForMultipleIPs(address registryAddress, uint256[] calldata ipIds, uint256[] calldata minAmounts, address userAddress) external view override returns (bool) {
        require(registryAddress != address(0), "Adresse registre invalide");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        require(ipIds.length == minAmounts.length, "Longueurs des tableaux differentes");
        
        IMintyShirtRegistry registry = IMintyShirtRegistry(registryAddress);
        
        for (uint256 i = 0; i < ipIds.length; i++) {
            address tokenAddress = registry.getRoyaltyTokenAddress(ipIds[i]);
            
            // Si aucun token n'est lié à l'IP, retourner false
            if (tokenAddress == address(0)) {
                return false;
            }
            
            // Vérifier le solde
            uint256 balance = IERC20(tokenAddress).balanceOf(userAddress);
            if (balance < minAmounts[i]) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * @dev Obtenir les soldes de tokens pour plusieurs IPs
     * @param registryAddress Adresse du registre
     * @param ipIds Liste des IDs d'IP
     * @param userAddress Adresse de l'utilisateur
     * @return balances Liste des soldes de tokens
     */
    function getTokenBalancesForMultipleIPs(address registryAddress, uint256[] calldata ipIds, address userAddress) external view override returns (uint256[] memory) {
        require(registryAddress != address(0), "Adresse registre invalide");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        IMintyShirtRegistry registry = IMintyShirtRegistry(registryAddress);
        uint256[] memory balances = new uint256[](ipIds.length);
        
        for (uint256 i = 0; i < ipIds.length; i++) {
            address tokenAddress = registry.getRoyaltyTokenAddress(ipIds[i]);
            
            // Si aucun token n'est lié à l'IP, le solde est 0
            if (tokenAddress == address(0)) {
                balances[i] = 0;
            } else {
                balances[i] = IERC20(tokenAddress).balanceOf(userAddress);
            }
        }
        
        return balances;
    }
    
    /**
     * @dev Créer un snapshot des soldes de tokens
     * @param tokenAddress Adresse du token
     * @return snapshotId ID du snapshot créé
     */
    function createSnapshot(address tokenAddress) external override returns (uint256) {
        require(tokenAddress != address(0), "Adresse token invalide");
        
        uint256 snapshotId = _snapshotIdCounter++;
        
        _snapshots[snapshotId] = Snapshot({
            id: snapshotId,
            tokenAddress: tokenAddress,
            timestamp: block.timestamp,
            active: true
        });
        
        emit SnapshotCreated(snapshotId, tokenAddress, block.timestamp);
        
        return snapshotId;
    }
    
    /**
     * @dev Obtenir les informations d'un snapshot
     * @param snapshotId ID du snapshot
     * @return Informations du snapshot
     */
    function getSnapshot(uint256 snapshotId) external view override returns (Snapshot memory) {
        require(_snapshots[snapshotId].id == snapshotId, "Snapshot inexistant");
        return _snapshots[snapshotId];
    }
    
    /**
     * @dev Enregistrer le solde d'un utilisateur dans un snapshot
     * @param snapshotId ID du snapshot
     * @param userAddress Adresse de l'utilisateur
     */
    function recordBalanceInSnapshot(uint256 snapshotId, address userAddress) external override {
        require(_snapshots[snapshotId].id == snapshotId, "Snapshot inexistant");
        require(_snapshots[snapshotId].active, "Snapshot inactif");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        address tokenAddress = _snapshots[snapshotId].tokenAddress;
        uint256 balance = IERC20(tokenAddress).balanceOf(userAddress);
        
        _snapshotBalances[snapshotId][userAddress] = balance;
        
        emit BalanceRecorded(snapshotId, userAddress, balance);
    }
    
    /**
     * @dev Obtenir le solde d'un utilisateur au moment d'un snapshot
     * @param snapshotId ID du snapshot
     * @param userAddress Adresse de l'utilisateur
     * @return balance Solde de tokens au moment du snapshot
     */
    function getBalanceAtSnapshot(uint256 snapshotId, address userAddress) external view override returns (uint256) {
        require(_snapshots[snapshotId].id == snapshotId, "Snapshot inexistant");
        require(userAddress != address(0), "Adresse utilisateur invalide");
        
        return _snapshotBalances[snapshotId][userAddress];
    }
    
    /**
     * @dev Vérifier si un utilisateur avait un montant minimum de tokens au moment d'un snapshot
     * @param snapshotId ID du snapshot
     * @param userAddress Adresse de l'utilisateur
     * @param minAmount Montant minimum requis
     * @return hadTokens L'utilisateur avait-il le montant minimum
     */
    function hadTokensAtSnapshot(uint256 snapshotId, address userAddress, uint256 minAmount) external view override returns (bool) {
        require(_snapshots[snapshotId].id == snapshotId, "Snapshot inexistant");
        require(userAddress != address(0), "Adresse utilisateur invalide");

        uint256 balance = _snapshotBalances[snapshotId][userAddress];
        return balance >= minAmount;
    }
}
