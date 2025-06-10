// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title ILicenseManager
 * @dev Interface pour le contrat LicenseManager
 */
interface ILicenseManager {
    // Énumérations
    enum LicenseType { REMIX, USAGE }
    enum LicenseStatus { PENDING, ACTIVE, REJECTED, EXPIRED, REVOKED }
    
    // Structures
    struct License {
        uint256 id;
        uint256 ipId;
        uint256 licenseeId;
        address requester;
        LicenseType licenseType;
        LicenseStatus status;
        uint256 createdAt;
        uint256 approvedAt;
        uint256 expiresAt;
        uint256 maxUsers;
        uint256 currentUsers;
        uint256 royaltyPercentage;
        string terms;
        string description;
        string revocationReason;
        uint256 duration;
        bool active;
        uint256 expiryDate;
    }
    
    // Fonctions
    function createLicenseRequest(
        uint256 ipId,
        LicenseType licenseType,
        string calldata description,
        uint256 duration,
        uint256 maxUsers,
        uint256 royaltyPercentage
    ) external returns (uint256);
    
    function getLicenseRequest(uint256 licenseId) external view returns (License memory);
    
    function approveLicenseRequest(uint256 licenseId) external returns (bool);
    
    function rejectLicenseRequest(uint256 licenseId) external;
    
    function createChildIP(uint256 licenseId, uint256 childIpId) external;
    
    function revokeLicense(uint256 licenseId, string calldata reason) external;
    
    function isLicenseActive(uint256 licenseId) external view returns (bool);
    
    function getParentIPIds(uint256 ipId) external view returns (uint256[] memory);
    
    function getChildIPIds(uint256 ipId) external view returns (uint256[] memory);
    
    function getLicense(uint256 licenseId) external view returns (License memory);
    
    function getChildIPs(uint256 parentIpId) external view returns (uint256[] memory);
    
    function updateLicenseStatus(uint256 licenseId, LicenseStatus status) external;
    
    function incrementLicenseUsers(uint256 licenseId, uint256 count) external;
}
