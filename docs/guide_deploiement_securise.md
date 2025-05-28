# Guide de déploiement sécurisé des smart contracts MintyShirt

Ce guide vous permettra de déployer vous-même les smart contracts du projet MintyShirt sur le testnet Aeneid de Story Protocol, sans avoir à partager votre clé privée en ligne.

## Prérequis

Avant de commencer, assurez-vous d'avoir :

1. **Node.js** installé sur votre ordinateur (version 16 ou supérieure)
2. **Git** installé sur votre ordinateur
3. **Un wallet Ethereum** (comme MetaMask) avec votre adresse `0x06b3821e55Fa975C8bD169f5dF232271fA08c284`
4. **Des tokens IP de test** sur le réseau Aeneid (que vous avez déjà obtenus)
5. **Des tokens ETH de test** sur le réseau Aeneid (pour payer les frais de transaction)

## Étape 1 : Télécharger le projet

1. Ouvrez un terminal (Command Prompt ou PowerShell sous Windows, Terminal sous Mac ou Linux)
2. Exécutez la commande suivante pour télécharger le projet :

```bash
git clone https://github.com/votre-organisation/web3-project.git
cd web3-project/implementation/smart-contracts
```

> **Note** : Si vous n'avez pas accès au dépôt GitHub, vous pouvez télécharger le projet sous forme de fichier ZIP et l'extraire sur votre ordinateur.

## Étape 2 : Installer les dépendances

Dans le dossier `smart-contracts`, exécutez la commande suivante pour installer les dépendances :

```bash
npm install
```

Cette commande peut prendre quelques minutes pour s'exécuter.

## Étape 3 : Configurer le fichier .env

1. Dans le dossier `smart-contracts`, créez un fichier nommé `.env` (ou modifiez-le s'il existe déjà)
2. Ajoutez les lignes suivantes dans ce fichier :

```
# Configuration pour le testnet Story Protocol Aenid
STORY_PROTOCOL_TESTNET_URL=https://aeneid.storyrpc.io
PRIVATE_KEY=VOTRE_CLE_PRIVEE_ICI
ETHERSCAN_API_KEY=ABCDEFGHIJKLMNOPQRSTUVWXYZ123456
REPORT_GAS=true
COINMARKETCAP_API_KEY=00000000-0000-0000-0000-000000000000
OWNER_ADDRESS=0x06b3821e55Fa975C8bD169f5dF232271fA08c284
```

> **IMPORTANT** : Remplacez `VOTRE_CLE_PRIVEE_ICI` par votre clé privée. Cette clé ne sera jamais partagée en ligne, elle reste uniquement sur votre ordinateur. Assurez-vous de ne jamais partager ce fichier .env avec qui que ce soit.

## Étape 4 : Vérifier la configuration du réseau

Assurez-vous que le fichier `hardhat.config.js` contient la configuration correcte pour le réseau Aeneid :

```javascript
storyProtocolTestnet: {
  url: process.env.STORY_PROTOCOL_TESTNET_URL || "https://aeneid.storyrpc.io",
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  chainId: 1315, // Aeneid testnet ID
  gasPrice: 20000000000 // 20 gwei
}
```

## Étape 5 : Déployer les smart contracts

Exécutez la commande suivante pour déployer les smart contracts sur le testnet Aeneid :

```bash
npx hardhat run scripts/deploy_testnet.js --network storyProtocolTestnet
```

Cette commande va :
1. Se connecter au testnet Aeneid
2. Utiliser votre clé privée pour signer les transactions
3. Déployer tous les smart contracts dans l'ordre correct
4. Configurer les interactions entre les contrats
5. Afficher les adresses des contrats déployés

> **Note** : Le déploiement peut prendre plusieurs minutes. Ne fermez pas le terminal pendant cette opération.

## Étape 6 : Vérifier le déploiement

Une fois le déploiement terminé, vous verrez les adresses des contrats déployés dans le terminal. Notez ces adresses, elles vous permettront d'interagir avec vos contrats.

Vous pouvez vérifier le déploiement en consultant l'explorateur de blocs Aeneid :
- [https://aeneid.storyscan.io](https://aeneid.storyscan.io)

Entrez l'adresse d'un contrat dans la barre de recherche pour voir les détails de la transaction de déploiement.

## Étape 7 : Interagir avec les contrats

Pour interagir avec vos contrats déployés, vous pouvez :

1. Utiliser la console Hardhat :
```bash
npx hardhat console --network storyProtocolTestnet
```

2. Écrire des scripts personnalisés dans le dossier `scripts` et les exécuter avec :
```bash
npx hardhat run scripts/votre-script.js --network storyProtocolTestnet
```

## Résolution des problèmes courants

### Erreur "insufficient funds"

Si vous voyez cette erreur, cela signifie que votre wallet n'a pas assez de tokens ETH pour payer les frais de transaction. Vous devez obtenir des tokens ETH de test via un faucet.

### Erreur de connexion au réseau

Vérifiez que l'URL RPC dans votre fichier `.env` est correcte : `https://aeneid.storyrpc.io`

### Autres erreurs

Si vous rencontrez d'autres problèmes, n'hésitez pas à me contacter pour obtenir de l'aide.

## Conclusion

Félicitations ! Vous avez maintenant déployé les smart contracts du projet MintyShirt sur le testnet Aeneid de Story Protocol. Vous pouvez commencer à interagir avec ces contrats et à tester les fonctionnalités du projet.

N'oubliez pas de sécuriser votre fichier `.env` contenant votre clé privée et de ne jamais le partager avec qui que ce soit.
