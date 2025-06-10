// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface ITokenVerifier {
    struct TokenAccess {
        uint256 amount;
        uint256 lastVerified;
    }

    struct TokenRequirement {
        address tokenAddress;
        uint256 minAmount;
        uint256 validityPeriod;
    }

    struct Snapshot {
        uint256 id;
        address tokenAddress;
        uint256 timestamp;
        bool active;
    }

    function verifyAccess(bytes32 featureId, address userAddress) external view returns (bool);

    function updateTokenAccess(address tokenAddress, address userAddress, uint256 amount) external;

    function addTokenRequirement(bytes32 featureId, address tokenAddress, uint256 minAmount, uint256 validityPeriod) external;

    function removeTokenRequirement(bytes32 featureId, address tokenAddress) external;

    function getTokenRequirements(bytes32 featureId) external view returns (TokenRequirement[] memory);

    function getTokenAccess(address tokenAddress, address userAddress) external view returns (TokenAccess memory);

    function hasTokens(address tokenAddress, address userAddress, uint256 minAmount) external view returns (bool);

    function hasTokensForIP(address registryAddress, uint256 ipId, address userAddress, uint256 minAmount) external view returns (bool);

    function getTokenBalance(address tokenAddress, address userAddress) external view returns (uint256);

    function getTokenBalanceForIP(address registryAddress, uint256 ipId, address userAddress) external view returns (uint256);

    function hasTokensForMultipleIPs(address registryAddress, uint256[] calldata ipIds, uint256[] calldata minAmounts, address userAddress) external view returns (bool);

    function getTokenBalancesForMultipleIPs(address registryAddress, uint256[] calldata ipIds, address userAddress) external view returns (uint256[] memory);

    function createSnapshot(address tokenAddress) external returns (uint256);

    function getSnapshot(uint256 snapshotId) external view returns (Snapshot memory);

    function recordBalanceInSnapshot(uint256 snapshotId, address userAddress) external;

    function getBalanceAtSnapshot(uint256 snapshotId, address userAddress) external view returns (uint256);

    function hadTokensAtSnapshot(uint256 snapshotId, address userAddress, uint256 minAmount) external view returns (bool);
}
