// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IRevenueDistributor
 * @dev Interface pour le contrat RevenueDistributor
 */
interface IRevenueDistributor {
    // Énumérations
    enum DistributionStatus {
        PENDING,
        COMPLETED,
        CANCELLED
    }
    
    struct Distribution {
        uint256 id;
        address tokenAddress;
        uint256 totalAmount;
        uint256 distributedAmount;
        uint256 platformFee;
        uint256 createdAt;
        uint256 completedAt;
        DistributionStatus status;
    }
    
    // Pour compatibilité avec les tests
    struct DistributionTest {
        address royaltyToken;
        uint256 amount;
        uint256 ipId;
        bool completed;
    }
    
    // Fonctions
    function createDistribution(address tokenAddress, uint256 amount, uint256 ipId) external payable returns (uint256);
    
    function executeDistribution(uint256 distributionId) external;
    
    function executeBatchDistribution(uint256[] calldata distributionIds) external;
    
    function getDistribution(uint256 distributionId) external view returns (DistributionTest memory);
    
    function getDistributionsForToken(address tokenAddress) external view returns (uint256[] memory);
    
    function updatePlatformFeePercentage(uint256 newPercentage) external;
    
    function updatePlatformWallet(address newWallet) external;
    
    function getPlatformFeePercentage() external view returns (uint256);
    
    function getPlatformWallet() external view returns (address);
}
