# Rapport de Déploiement du Site Web MintyShirt

## Introduction

Ce document présente le rapport final du développement et du déploiement du site web MintyShirt, une plateforme décentralisée pour les créateurs de designs de t-shirts utilisant la blockchain et la technologie IP de Story Protocol. Le site permet aux créateurs d'enregistrer leurs designs comme propriété intellectuelle, de définir des licences, et de monétiser leurs créations via des tokens de redevance.

## Smart Contracts Déployés

Les smart contracts suivants ont été déployés avec succès sur le testnet Aeneid de Story Protocol :

| Contrat | Adresse |
|---------|---------|
| MintyShirtRegistry | `0xc010C027c557dB20F5A0cE653Cca257A3De24843` |
| LicenseManager | `0x7a67Cd67A8283BCBbEB53136Cf83a7a6729d9269` |
| RevenueDistributor | `0x342a8FA38C1e8118cD7cDDB3af3e9C156958afd2` |
| TokenVerifier | `0xd712770C608Ea7E82C719f85673D4Eb3932C2525` |

Ces contrats ont été corrigés et validés par une suite complète de tests unitaires (53/53 tests réussis).

## Structure du Site Web

Le site web MintyShirt a été développé avec les technologies suivantes :

- **Frontend** : React avec Tailwind CSS pour l'interface utilisateur
- **Backend** : Flask pour les services API
- **Intégration Blockchain** : ethers.js pour l'interaction avec les smart contracts

La structure du site comprend :

1. **Page d'accueil** : Présentation de la plateforme et accès aux principales fonctionnalités
2. **Page de test** : Interface guidée pour tester toutes les fonctionnalités principales
3. **Composants d'interaction blockchain** :
   - Connexion wallet (WalletConnectButton)
   - Enregistrement créateur (CreatorRegistration)
   - Téléversement de designs (DesignUpload)
   - Visualisation des designs (DesignCard)

## Fonctionnalités Implémentées

Les fonctionnalités suivantes ont été implémentées et testées :

1. **Connexion Wallet** :
   - Support de MetaMask et autres wallets compatibles
   - Détection automatique du réseau et suggestion de changement
   - Affichage de l'adresse connectée

2. **Enregistrement Créateur** :
   - Formulaire d'enregistrement avec nom et profil
   - Interaction avec le contrat MintyShirtRegistry
   - Gestion des erreurs et feedback utilisateur

3. **Téléversement de Designs** :
   - Formulaire de téléversement avec paramètres de licence
   - Options pour l'IA, l'usage commercial et le remix
   - Enregistrement sur la blockchain via le contrat MintyShirtRegistry

4. **Exploration des Designs** :
   - Affichage des designs enregistrés sur la blockchain
   - Visualisation des informations de licence et de créateur
   - Interface responsive adaptée à tous les appareils

5. **Page de Test Complète** :
   - Parcours guidé pour tester toutes les fonctionnalités
   - Indicateurs de statut pour chaque étape
   - Instructions détaillées pour les utilisateurs

## Guide d'Installation et de Déploiement

### Prérequis

- Node.js v16 ou supérieur
- Python 3.8 ou supérieur
- Un wallet Ethereum avec des tokens IP sur le testnet Aeneid

### Installation du Frontend

1. Cloner le dépôt :
   ```
   git clone https://github.com/votre-repo/mintyshirt.git
   cd mintyshirt/implementation/frontend
   ```

2. Installer les dépendances :
   ```
   npm install
   ```

3. Configurer les variables d'environnement :
   Créer un fichier `.env` avec les adresses des contrats :
   ```
   REACT_APP_REGISTRY_ADDRESS=0xc010C027c557dB20F5A0cE653Cca257A3De24843
   REACT_APP_LICENSE_MANAGER_ADDRESS=0x7a67Cd67A8283BCBbEB53136Cf83a7a6729d9269
   REACT_APP_REVENUE_DISTRIBUTOR_ADDRESS=0x342a8FA38C1e8118cD7cDDB3af3e9C156958afd2
   REACT_APP_TOKEN_VERIFIER_ADDRESS=0xd712770C608Ea7E82C719f85673D4Eb3932C2525
   ```

4. Lancer l'application en mode développement :
   ```
   npm start
   ```

5. Pour construire l'application pour la production :
   ```
   npm run build
   ```

### Installation du Backend

1. Naviguer vers le dossier backend :
   ```
   cd ../backend/mintyshirt_backend
   ```

2. Créer et activer un environnement virtuel :
   ```
   python -m venv venv
   source venv/bin/activate  # Sur Windows : venv\Scripts\activate
   ```

3. Installer les dépendances :
   ```
   pip install -r requirements.txt
   # Flask-CORS est nécessaire pour les requêtes cross-origin
   pip install Flask-CORS
   ```

4. Configurer les variables d'environnement :
   Créer un fichier `.env` avec les configurations nécessaires.

5. Lancer le serveur de développement :
   ```
   python src/main.py
   ```

## Guide d'Utilisation

### Connexion Wallet

1. Cliquez sur le bouton "Connecter Wallet" en haut à droite de la page
2. Autorisez la connexion dans votre extension de wallet (MetaMask, etc.)
3. Si vous n'êtes pas sur le réseau Story Aeneid Testnet, cliquez sur "Changer de réseau"

### Enregistrement Créateur

1. Accédez à la section "Devenir Créateur"
2. Remplissez le formulaire avec votre nom et l'URL de votre profil
3. Cliquez sur "S'enregistrer comme créateur"
4. Confirmez la transaction dans votre wallet

### Téléversement de Design

1. Accédez à la section "Téléverser un Design"
2. Remplissez le formulaire avec le nom du design et l'URL du contenu
3. Sélectionnez les permissions souhaitées (IA, commercial, remix)
4. Cliquez sur "Enregistrer le design"
5. Confirmez la transaction dans votre wallet

### Exploration des Designs

1. Accédez à la section "Explorer les Designs"
2. Parcourez les designs disponibles
3. Cliquez sur "Voir" pour afficher les détails d'un design

## Tests et Validation

Pour tester l'application de manière guidée :

1. Accédez à la page d'accueil
2. Cliquez sur le bouton "Tester l'Application"
3. Suivez les étapes du parcours de test :
   - Connexion du wallet
   - Enregistrement créateur
   - Téléversement de design
   - Exploration des designs

## Problèmes Connus et Limitations

1. **Stockage IPFS** : L'intégration directe avec IPFS n'est pas encore implémentée. Les utilisateurs doivent fournir des URLs IPFS ou HTTP valides.

2. **TokenSwap** : La fonctionnalité d'échange de tokens est simplifiée dans cette version et nécessitera des développements supplémentaires.

3. **Frais de Gas** : Sur le testnet Aeneid, les frais sont payés en tokens IP. Assurez-vous d'avoir suffisamment de tokens pour les transactions.

## Prochaines Étapes

1. **Intégration IPFS** : Ajouter un service de téléversement direct vers IPFS
2. **TokenSwap Avancé** : Développer un contrat dédié pour l'échange de tokens
3. **Groupes de Chat Privés** : Implémenter les fonctionnalités de communauté
4. **Programme d'Affiliation** : Développer le système de récompenses pour les affiliés

## Conclusion

Le site web MintyShirt est maintenant prêt à être utilisé sur le testnet Aeneid de Story Protocol. Toutes les fonctionnalités essentielles ont été implémentées et testées avec succès. Les utilisateurs peuvent s'enregistrer comme créateurs, téléverser leurs designs, et explorer les créations existantes.

Pour toute question ou assistance supplémentaire, n'hésitez pas à nous contacter.
