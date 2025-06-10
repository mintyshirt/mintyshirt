// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IMintyShirtRegistry.sol";

/**
 * @title GroupingModule
 * @dev Permet d'associer plusieurs designs à une même IP
 */
contract GroupingModule is Ownable, ReentrancyGuard {
    address private _registryAddress;

    // ipId => liste des designIds
    mapping(uint256 => uint256[]) private _ipDesigns;
    // designId => ipId
    mapping(uint256 => uint256) private _designToIp;

    event DesignGrouped(uint256 indexed ipId, uint256 indexed designId);
    event DesignUngrouped(uint256 indexed ipId, uint256 indexed designId);

    constructor(address registryAddress) {
        require(registryAddress != address(0), "Adresse registre invalide");
        _registryAddress = registryAddress;
        _transferOwnership(msg.sender);
    }

    /**
     * @dev Associe un design à une IP existante
     */
    function addDesignToIP(uint256 ipId, uint256 designId) external {
        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        IMintyShirtRegistry.IPAsset memory ipAsset = registry.getIPAsset(ipId);
        IMintyShirtRegistry.IPAsset memory designAsset = registry.getIPAsset(designId);

        require(ipAsset.id == ipId && ipAsset.active, "IP inexistante");
        require(designAsset.id == designId && designAsset.active, "Design inexistant");

        address creatorAddr = registry.getCreator(ipAsset.creatorId).creatorAddress;
        require(msg.sender == creatorAddr || msg.sender == owner(), "Non autorise");
        require(_designToIp[designId] == 0, "Design deja groupe");

        _ipDesigns[ipId].push(designId);
        _designToIp[designId] = ipId;

        emit DesignGrouped(ipId, designId);
    }

    /**
     * @dev Retire l'association d'un design avec une IP
     */
    function removeDesignFromIP(uint256 designId) external {
        uint256 ipId = _designToIp[designId];
        require(ipId != 0, "Design non groupe");

        IMintyShirtRegistry registry = IMintyShirtRegistry(_registryAddress);
        address creatorAddr = registry.getCreator(registry.getIPAsset(ipId).creatorId).creatorAddress;
        require(msg.sender == creatorAddr || msg.sender == owner(), "Non autorise");

        uint256[] storage designs = _ipDesigns[ipId];
        for (uint256 i = 0; i < designs.length; i++) {
            if (designs[i] == designId) {
                designs[i] = designs[designs.length - 1];
                designs.pop();
                break;
            }
        }
        delete _designToIp[designId];
        emit DesignUngrouped(ipId, designId);
    }

    function getDesignsForIP(uint256 ipId) external view returns (uint256[] memory) {
        return _ipDesigns[ipId];
    }

    function getIPForDesign(uint256 designId) external view returns (uint256) {
        return _designToIp[designId];
    }
}
