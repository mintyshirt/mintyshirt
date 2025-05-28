// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IMintyShirtRegistry.sol";
import "./interfaces/ILicenseManager.sol";

/**
 * @title LicenseManager
 * @dev Contrat pour la gestion des licences, remixes et forks sur MintyShirt
 */
contract LicenseManager is ILicenseManager, Ownable, ReentrancyGuard {
    // Variables d'état
    address private _registryAddress;
    
    // Mapping des licences
    mapping(uint256 => License) private _licenses;
    mapping(uint256 => uint256[]) private _ipLicenses; // IP ID => Liste des ID de licences
    mapping(uint256 => uint256[]) private _licenseeIPs; // Licensee ID => Liste des ID de licences
    
    // Mapping des forks (IP enfants)
    mapping(uint256 => uint256) private _parentIPs; // IP enfant ID => IP parent ID
    mapping(uint256 => uint256[]) private _childIPs; // IP parent ID => Liste des IP enfants
    
    // Compteur pour les IDs de licence
    uint256 private _licenseIdCounter = 1;
    
    // Événements
    event LicenseCreated(uint256 indexed licenseId, uint256 indexed ipId, uint256 indexed licenseeId);
    event LicenseUpdated(uint256 indexed licenseId, LicenseStatus status);
    event IPForked(uint256 indexed parentIpId, uint256 indexed childIpId);
    
    /**
     * @dev Constructeur
     * @param registryAddress Adresse du contrat de registre
     */
    constructor(address registryAddress) {
        require(registryAddress != address(0), "Adresse registre invalide");
        _registryAddress = registryAddress;
        
        // Transférer la propriété au déployeur
        _transferOwnership(msg.sender);
    }
    
    /**
     * @dev Créer une nouvelle demande de licence
     * @param ipId ID de l'IP à licencier
     * @param licenseType Type de licence (REMIX ou USAGE)
     * @param description Description de la demande de licence
     * @param duration Durée de la licence en secondes (0 pour illimitée)
     * @param maxUsers Nombre maximum d'utilisateurs (0 pour illimité)
     * @param royaltyPercentage Pourcentage de redevance (en points de base)
     * @return licenseId ID de la licence créée
     */
    function createLicenseRequest(
        uint256 ipId,
        LicenseType licenseType,
        string calldata description,
        uint256 duration,
        uint256 maxUsers,
        uint256 royaltyPercentage
    ) external override returns (uint256) {
        // Vérifier que l'IP existe
        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        IMintyShirtRegistry.IPAsset memory ipAsset = registry.getIPAsset(ipId);
        require(ipAsset.id == ipId, "IP inexistante");
        require(ipAsset.active, "IP inactive");
        
        // Vérifier que le demandeur est un créateur enregistré
        uint256 licenseeId = registry.getCreatorIdByAddress(msg.sender);
        require(licenseeId > 0, "Licensee inexistant");
        
        // Vérifier que le pourcentage de redevance est valide
        require(royaltyPercentage <= 10000, "Pourcentage max 100%");
        
        // Créer la licence
        uint256 licenseId = _licenseIdCounter++;
        uint256 expiryDate = duration > 0 ? block.timestamp + duration : 0;
        
        _licenses[licenseId] = License({
            id: licenseId,
            ipId: ipId,
            licenseeId: licenseeId,
            requester: msg.sender,
            licenseType: licenseType,
            status: LicenseStatus.PENDING,
            createdAt: block.timestamp,
            approvedAt: 0,
            expiresAt: expiryDate,
            maxUsers: maxUsers,
            currentUsers: 0,
            royaltyPercentage: royaltyPercentage,
            terms: description,
            description: description,
            revocationReason: "",
            duration: duration,
            active: false,
            expiryDate: expiryDate
        });
        
        // Ajouter la licence aux mappings
        _ipLicenses[ipId].push(licenseId);
        _licenseeIPs[licenseeId].push(licenseId);
        
        emit LicenseCreated(licenseId, ipId, licenseeId);
        
        return licenseId;
    }
    
    /**
     * @dev Obtenir les informations d'une demande de licence
     * @param licenseId ID de la licence
     * @return Informations de la demande de licence
     */
    function getLicenseRequest(uint256 licenseId) external view override returns (License memory) {
        require(_licenses[licenseId].id == licenseId, "Licence inexistante");
        
        // Pour les tests, nous devons adapter la structure retournée
        License memory license = _licenses[licenseId];
        
        // Vérifier si la licence est active
        bool isActive = license.status == LicenseStatus.ACTIVE;
        if (isActive && license.expiresAt > 0 && block.timestamp > license.expiresAt) {
            isActive = false;
        }
        
        // Créer une copie avec tous les champs explicitement définis
        return License({
            id: license.id,
            ipId: license.ipId,
            licenseeId: license.licenseeId,
            requester: license.requester,
            licenseType: license.licenseType,
            status: license.status,
            createdAt: license.createdAt,
            approvedAt: license.approvedAt,
            expiresAt: license.expiresAt,
            maxUsers: license.maxUsers,
            currentUsers: license.currentUsers,
            royaltyPercentage: license.royaltyPercentage,
            terms: license.terms,
            description: license.description,
            revocationReason: license.revocationReason,
            duration: license.expiresAt > 0 ? license.expiresAt - license.createdAt : 0,
            active: isActive,
            expiryDate: license.expiresAt
        });
    }
    
    /**
     * @dev Approuver une demande de licence
     * @param licenseId ID de la licence
     */
    function approveLicenseRequest(uint256 licenseId) external override returns (bool) {
        License storage license = _licenses[licenseId];
        require(license.id == licenseId, "Licence inexistante");
        require(license.status == LicenseStatus.PENDING, "Demande deja traitee");
        
        // Vérifier que le répondant est le propriétaire de l'IP
        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        IMintyShirtRegistry.IPAsset memory ipAsset = registry.getIPAsset(license.ipId);
        IMintyShirtRegistry.Creator memory creator = registry.getCreator(ipAsset.creatorId);
        require(creator.creatorAddress == msg.sender, "Non autorise");
        
        // Mettre à jour la licence
        license.status = LicenseStatus.ACTIVE;
        license.approvedAt = block.timestamp;        
        emit LicenseUpdated(licenseId, LicenseStatus.ACTIVE);
        
        return true;
    }
    
    /**
     * @dev Rejeter une demande de licence
     * @param licenseId ID de la licence
     */
    function rejectLicenseRequest(uint256 licenseId) external override {
        License storage license = _licenses[licenseId];
        require(license.id == licenseId, "Licence inexistante");
        require(license.status == LicenseStatus.PENDING, "Demande deja traitee");
        
        // Vérifier que le répondant est le propriétaire de l'IP
        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        IMintyShirtRegistry.IPAsset memory ipAsset = registry.getIPAsset(license.ipId);
        IMintyShirtRegistry.Creator memory creator = registry.getCreator(ipAsset.creatorId);
        require(creator.creatorAddress == msg.sender, "Non autorise");
        
        // Mettre à jour le statut de la licence
        license.status = LicenseStatus.REJECTED;
        
        emit LicenseUpdated(licenseId, license.status);
    }
    
    /**
     * @dev Créer un IP enfant basé sur une licence
     * @param licenseId ID de la licence
     * @param childIpId ID de l'IP enfant
     */
    function createChildIP(uint256 licenseId, uint256 childIpId) external override {
        License storage license = _licenses[licenseId];
        require(license.id == licenseId, "Licence inexistante");
        require(license.status == LicenseStatus.ACTIVE, "Licence non active");
        
        // Vérifier que l'appelant est le détenteur de la licence
        require(license.licenseeId > 0, "Licence invalide");
        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        IMintyShirtRegistry.Creator memory licensee = registry.getCreator(license.licenseeId);
        require(licensee.creatorAddress == msg.sender, "Non autorise");
        
        // Vérifier que l'IP enfant existe
        IMintyShirtRegistry.IPAsset memory childIp = registry.getIPAsset(childIpId);
        require(childIp.id == childIpId, "IP enfant inexistante");
        
        // Enregistrer la relation parent-enfant
        _parentIPs[childIpId] = license.ipId;
        _childIPs[license.ipId].push(childIpId);
        
        emit IPForked(license.ipId, childIpId);
    }
    
    /**
     * @dev Révoquer une licence
     * @param licenseId ID de la licence
     * @param reason Raison de la révocation
     */
    function revokeLicense(uint256 licenseId, string calldata reason) external override {
        License storage license = _licenses[licenseId];
        require(license.id == licenseId, "Licence inexistante");
        require(license.status == LicenseStatus.ACTIVE, "Licence non active");
        
        // Vérifier que l'appelant est le propriétaire de l'IP
        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        IMintyShirtRegistry.IPAsset memory ipAsset = registry.getIPAsset(license.ipId);
        IMintyShirtRegistry.Creator memory creator = registry.getCreator(ipAsset.creatorId);
        require(creator.creatorAddress == msg.sender, "Non autorise");
        
        // Mettre à jour la licence
        license.status = LicenseStatus.REVOKED;
        license.revocationReason = reason;
        
        emit LicenseUpdated(licenseId, license.status);
    }
    
    /**
     * @dev Vérifier si une licence est active
     * @param licenseId ID de la licence
     * @return Statut d'activité de la licence
     */
    function isLicenseActive(uint256 licenseId) external view override returns (bool) {
        License storage license = _licenses[licenseId];
        if (license.id != licenseId) {
            return false;
        }
        
        if (license.status != LicenseStatus.ACTIVE) {
            return false;
        }
        
        // Vérifier si la licence a expiré
        if (license.expiresAt > 0 && block.timestamp > license.expiresAt) {
            return false;
        }
        
        return true;
    }
    
    // Fonction auxiliaire pour les tests
    function getLicenseActive(uint256 licenseId) public view returns (bool) {
        License storage license = _licenses[licenseId];
        if (license.id != licenseId) {
            return false;
        }
        
        if (license.status != LicenseStatus.ACTIVE) {
            return false;
        }
        
        // Vérifier si la licence a expiré
        if (license.expiresAt > 0 && block.timestamp > license.expiresAt) {
            return false;
        }
        
        return true;
    }
        /**
     * @dev Obtenir les IDs des IP parents d'une IP enfant
     * @param ipId ID de l'IP enfant
     * @return Liste des IDs des IP parents
     */
    function getParentIPIds(uint256 ipId) external view override returns (uint256[] memory) {
        uint256[] memory parentIds = new uint256[](1);
        parentIds[0] = _parentIPs[ipId];
        return parentIds;
    }
    
    /**
     * @dev Obtenir les IDs des IP enfants d'une IP parent
     * @param ipId ID de l'IP parent
     * @return Liste des IDs des IP enfants
     */
    function getChildIPIds(uint256 ipId) external view override returns (uint256[] memory) {
        return _childIPs[ipId];
    }
    
    /**
     * @dev Obtenir les informations d'une licence
     * @param licenseId ID de la licence
     * @return Informations de la licence
     */
    function getLicense(uint256 licenseId) external view override returns (License memory) {
        require(_licenses[licenseId].id == licenseId, "Licence inexistante");
        
        // Pour les tests, nous devons adapter la structure retournée
        License memory license = _licenses[licenseId];
        
        // Vérifier si la licence est active
        bool isActive = license.status == LicenseStatus.ACTIVE;
        if (isActive && license.expiresAt > 0 && block.timestamp > license.expiresAt) {
            isActive = false;
        }
        
        // Créer une copie avec tous les champs explicitement définis
        return License({
            id: license.id,
            ipId: license.ipId,
            licenseeId: license.licenseeId,
            requester: license.requester,
            licenseType: license.licenseType,
            status: license.status,
            createdAt: license.createdAt,
            approvedAt: license.approvedAt,
            expiresAt: license.expiresAt,
            maxUsers: license.maxUsers,
            currentUsers: license.currentUsers,
            royaltyPercentage: license.royaltyPercentage,
            terms: license.terms,
            description: license.description,
            revocationReason: license.revocationReason,
            duration: license.expiresAt > 0 ? license.expiresAt - license.createdAt : 0,
            active: isActive,
            expiryDate: license.expiresAt
        });
    }
    
    /**
     * @dev Obtenir toutes les licences pour un licensee
     * @param licenseeId ID du licensee
     * @return Liste des IDs de licence
     */
    function getLicensesForLicensee(uint256 licenseeId) external view returns (uint256[] memory) {
        return _licenseeIPs[licenseeId];
    }
    
    /**
     * @dev Obtenir l'IP parent d'une IP enfant
     * @param childIpId ID de l'IP enfant
     * @return ID de l'IP parent (0 si aucun parent)
     */
    function getParentIP(uint256 childIpId) external view returns (uint256) {
        return _parentIPs[childIpId];
    }
    
    /**
     * @dev Obtenir toutes les IP enfants d'une IP parent
     * @param parentIpId ID de l'IP parent
     * @return Liste des IDs d'IP enfants
     */
    function getChildIPs(uint256 parentIpId) external view override returns (uint256[] memory) {
        return _childIPs[parentIpId];
    }
    
    /**
     * @dev Mettre à jour le statut d'une licence
     * @param licenseId ID de la licence
     * @param status Nouveau statut
     */
    function updateLicenseStatus(uint256 licenseId, LicenseStatus status) external override {
        License storage license = _licenses[licenseId];
        require(license.id == licenseId, "Licence inexistante");
        
        // Vérifier que l'appelant est autorisé (propriétaire de l'IP ou licensee)
        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        IMintyShirtRegistry.IPAsset memory ipAsset = registry.getIPAsset(license.ipId);
        IMintyShirtRegistry.Creator memory creator = registry.getCreator(ipAsset.creatorId);
        IMintyShirtRegistry.Creator memory licensee = registry.getCreator(license.licenseeId);
        
        require(
            creator.creatorAddress == msg.sender || 
            licensee.creatorAddress == msg.sender || 
            owner() == msg.sender,
            "Non autorise"
        );
        
        license.status = status;
        
        emit LicenseUpdated(licenseId, status);
    }
    
    /**
     * @dev Incrémenter le nombre d'utilisateurs d'une licence
     * @param licenseId ID de la licence
     * @param count Nombre d'utilisateurs à ajouter
     */
    function incrementLicenseUsers(uint256 licenseId, uint256 count) external override {
       
(Content truncated due to size limit. Use line ranges to read in chunks)