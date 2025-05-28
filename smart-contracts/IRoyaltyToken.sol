// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IRoyaltyToken
 * @dev Interface pour le contrat RoyaltyToken
 */
interface IRoyaltyToken {
    // Fonctions
    function getIPId() external view returns (uint256);
    
    function getRoyaltyPercentage() external view returns (uint256);
    
    function distributeRoyalties(uint256 amount) external;
    
    function updateRoyaltyPercentage(uint256 newPercentage) external;
    
    function getTotalDistributed() external view returns (uint256);
    
    function getHolderBalance(address holder) external view returns (uint256);
    
    function getHolderRoyaltyShare(address holder) external view returns (uint256);
}
