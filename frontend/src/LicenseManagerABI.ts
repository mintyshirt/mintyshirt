export const LicenseManagerABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_registryAddress",
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
        "internalType": "uint256",
        "name": "licenseId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ipId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "licensee",
        "type": "address"
      }
    ],
    "name": "LicenseApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "licenseId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ipId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "licensee",
        "type": "address"
      }
    ],
    "name": "LicenseRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "licenseId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "ipId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "licensee",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "reason",
        "type": "string"
      }
    ],
    "name": "LicenseRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "parentIpId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "childIpId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "NewChildIPCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_licenseId",
        "type": "uint256"
      }
    ],
    "name": "approveLicenseRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_parentIpId",
        "type": "uint256"
      },
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
    "name": "createChildIP",
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
        "internalType": "uint256",
        "name": "_ipId",
        "type": "uint256"
      },
      {
        "internalType": "enum ILicenseManager.LicenseType",
        "name": "_licenseType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_terms",
        "type": "string"
      }
    ],
    "name": "createLicenseRequest",
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
        "internalType": "uint256",
        "name": "_licenseId",
        "type": "uint256"
      }
    ],
    "name": "getLicense",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ipId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "licensee",
            "type": "address"
          },
          {
            "internalType": "enum ILicenseManager.LicenseType",
            "name": "licenseType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "requestTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "approvalTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiresAt",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "terms",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "revocationReason",
            "type": "string"
          }
        ],
        "internalType": "struct ILicenseManager.License",
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
        "name": "_ipId",
        "type": "uint256"
      }
    ],
    "name": "getLicensesForIP",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_licensee",
        "type": "address"
      }
    ],
    "name": "getLicensesForLicensee",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
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
    "name": "getParentIPIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ipToLicenses",
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
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "licenses",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ipId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "licensee",
        "type": "address"
      },
      {
        "internalType": "enum ILicenseManager.LicenseType",
        "name": "licenseType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "requestTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "approvalTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "expiresAt",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "terms",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "revocationReason",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "licenseeToLicenses",
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
    "name": "nextLicenseId",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "parentChildRelationships",
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
    "name": "registry",
    "outputs": [
      {
        "internalType": "contract MintyShirtRegistry",
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
        "internalType": "uint256",
        "name": "_licenseId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_reason",
        "type": "string"
      }
    ],
    "name": "revokeLicense",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
