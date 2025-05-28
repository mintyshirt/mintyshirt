export const MintyShirtRegistryABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "creatorAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "creatorName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "creatorId",
        "type": "uint256"
      }
    ],
    "name": "CreatorRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ipId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "creatorId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipName",
        "type": "string"
      }
    ],
    "name": "IPAssetRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ipId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "RoyaltyTokenLinked",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creators",
    "outputs": [
      {
        "internalType": "address",
        "name": "creatorAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "profileURI",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_creatorAddress",
        "type": "address"
      }
    ],
    "name": "getCreatorIdByAddress",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ipId",
        "type": "uint256"
      }
    ],
    "name": "getIPAsset",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "creatorId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "contentURI",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "allowAITraining",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "allowCommercialUse",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "allowRemixing",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "royaltyTokenAddress",
            "type": "address"
          }
        ],
        "internalType": "struct MintyShirtRegistry.IPAsset",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ipAssets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "creatorId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contentURI",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "allowAITraining",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "allowCommercialUse",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "allowRemixing",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "royaltyTokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ipId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "name": "linkRoyaltyToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextCreatorId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextIPId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_contentURI",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "_allowAITraining",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_allowCommercialUse",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_allowRemixing",
        "type": "bool"
      }
    ],
    "name": "registerIPAsset",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_profileURI",
        "type": "string"
      }
    ],
    "name": "registerNewCreator",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
