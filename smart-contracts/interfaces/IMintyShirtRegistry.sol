// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IMintyShirtRegistry {
    struct Creator {
        uint256 id;
        address creatorAddress;
        string name;
        string profileUri;
        uint256 registeredAt;
        bool active;
    }

    struct IPAsset {
        uint256 id;
        uint256 creatorId;
        string name;
        string description;
        string ipfsHash;
        string contentType;
        bool allowAI;
        uint256 registeredAt;
        bool active;
    }

    function registerCreator(address creatorAddress, string calldata name, string calldata profileUri) external returns (uint256);

    function registerIPAsset(uint256 creatorId, string calldata name, string calldata description, string calldata ipfsHash, string calldata contentType, bool allowAI) external returns (uint256);

    function linkRoyaltyToken(uint256 ipId, address tokenAddress) external;

    function getCreator(uint256 creatorId) external view returns (Creator memory);

    function getCreatorIdByAddress(address creatorAddress) external view returns (uint256);

    function getIPAsset(uint256 ipId) external view returns (IPAsset memory);

    function getRoyaltyTokenAddress(uint256 ipId) external view returns (address);

    function updateCreatorStatus(uint256 creatorId, bool active) external;

    function updateIPAssetStatus(uint256 ipId, bool active) external;

    function updateIPAssetAIStatus(uint256 ipId, bool allowAI) external;
}
