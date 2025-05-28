    }
    
    function getTotalDistributed() external view returns (uint256) {
        return _totalDistributed;
    }
    
    function getHolderBalance(address holder) external view returns (uint256) {
        return balanceOf(holder);
    }
    
    function getHolderRoyaltyShare(address holder) external view returns (uint256) {
        if (totalSupply() == 0) return 0;
        return (balanceOf(holder) * 10000) / totalSupply();
    }
    
    function distributeRoyalties(uint256 amount) external {
        _totalDistributed += amount;
        emit RoyaltiesDistributed(amount, block.timestamp);
    }
    
    function updateRoyaltyPercentage(uint256 newPercentage) external {
        require(msg.sender == _owner, "Non autorise");
        require(newPercentage <= 10000, "Pourcentage max 100%");
        
        uint256 oldPercentage = _royaltyPercentage;
        _royaltyPercentage = newPercentage;
        
        emit RoyaltyPercentageUpdated(oldPercentage, newPercentage);
    }
    