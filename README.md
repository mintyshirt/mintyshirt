# Récapitulatif du Projet MintyShirt

## État Actuel du Projet

Le projet MintyShirt est une plateforme décentralisée pour les créateurs de designs de t-shirts, utilisant la blockchain et la technologie IP de Story Protocol. Le développement actuel comprend :

1. **Smart Contracts** : Déployés sur le testnet Aeneid de Story Protocol
   - MintyShirtRegistry
   - LicenseManager
   - RevenueDistributor
   - TokenVerifier
   - GroupingModule
   - RoyaltyToken

2. **Frontend** : Développé avec React/TypeScript et Tailwind CSS
   - Interface utilisateur complète
   - Intégration Web3 pour les interactions blockchain
   - Composants pour la connexion wallet, l'enregistrement créateur, le téléversement de designs

3. **Backend** : API Flask pour la gestion des utilisateurs et l'intégration IPFS

## Structure des Fichiers et Composants

### Frontend
- `/src/contexts/Web3Context.tsx` : Contexte pour la connexion wallet et l'interaction blockchain
- `/src/contexts/AuthContext.tsx` : Authentification et gestion du rôle utilisateur
- `/src/lib/api.ts` : Base d'URL pour les appels à l'API
- `/src/lib/abis/` : ABIs des smart contracts
- `/src/components/` : Pages et composants UI (Navbar, ChooseRolePage, UploadDesignPage, etc.)
- `/src/services/registry.ts` : Appels au contrat MintyShirtRegistry

### Backend
- `/backend/src/main.py` : Point d'entrée de l'API Flask
- `/backend/src/routes/` : Routes API pour les utilisateurs, designs, etc.
- `/backend/src/models/` : Modèles de données
- `/backend/src/services/` : Services pour IPFS, blockchain, etc.

### Smart Contracts
- `MintyShirtRegistry.sol` : Registre principal des designs et créateurs
- `LicenseManager.sol` : Gestion des licences et permissions
- `RevenueDistributor.sol` : Distribution des revenus et royalties
- `TokenVerifier.sol` : Vérification des tokens pour l'accès aux fonctionnalités
- `GroupingModule.sol` : Association de plusieurs designs à une même IP
- `RoyaltyToken.sol` : Token ERC20 pour les royalties

## Fonctionnalités Implémentées

1. **Connexion Wallet**
   - Intégration avec MetaMask et autres wallets compatibles EIP-1193
   - Détection du réseau et suggestion de changement vers Aeneid Testnet

2. **Enregistrement Créateur**
   - Formulaire d'enregistrement avec validation
   - Interaction avec le smart contract MintyShirtRegistry

3. **Téléversement de Design**
   - Formulaire avec options de licence (remix, usage commercial, entraînement IA)
   - Enregistrement sur la blockchain via MintyShirtRegistry

4. **Exploration des Designs**
   - Affichage des designs enregistrés sur la blockchain
   - Chargement des métadonnées et images depuis IPFS

5. **Authentification Utilisateur**
   - Connexion avec email/mot de passe
   - Connexion avec wallet et signature
   - Sélection du rôle *fan* ou *creator* via `ChooseRolePage`
   - Changement de rôle à tout moment depuis la barre de navigation

## Fonctionnalités à Implémenter

1. **Intégration Tomo.inc**
   - Vérification de token au niveau du whitelisting

2. **Intégration Covalent**
   - Snapshot au niveau du whitelisting

3. **Intégration Gelato**
   - Impression à la demande

4. **Grouping Module**
   - Enregistrement de designs en liaison avec l'actif IP principal

5. **Système d'Affiliation**
   - Tokens donnant droit aux liens d'affiliation
   - Groupes de chat privés

6. **Système de Whitelisting**
   - Gestion des accès prioritaires
   - Vérification des tokens

7. **Intégration Amazon SES**
   - Envoi d'emails transactionnels
   - Notifications

8. **Système de Batching**
   - Regroupement de transactions pour réduire les coûts de gaz
   - Utilisation de multicall ou contrats agrégateurs

## Instructions pour le Déploiement

### GitHub
1. Créer un nouveau dépôt pour le projet
2. Créer deux branches : main (production) et development
3. Pousser le code source initial
4. Configurer les workflows GitHub Actions

### Netlify (Frontend)
1. Connecter le dépôt GitHub
2. Configurer les paramètres de build :
   - Build command : `npm run build`
   - Publish directory : `dist`
3. Configurer les variables d'environnement :
   - `VITE_API_URL` : URL de l'API backend
     - Le frontend utilise l'utilitaire `API_BASE` (voir `src/lib/api.ts`) qui se
       base sur cette variable. Si elle n'est pas renseignée, `/api` sera
       utilisé par défaut. Si le backend expose ses routes sous `/api`, cette
       valeur doit inclure ce préfixe, par exemple&nbsp;:
       `VITE_API_URL=https://example.com/api`
   - `VITE_CONTRACT_REGISTRY` : Adresse du contrat MintyShirtRegistry
   - `VITE_CONTRACT_LICENSE` : Adresse du contrat LicenseManager
   - `VITE_CONTRACT_REVENUE` : Adresse du contrat RevenueDistributor
   - `VITE_CONTRACT_GROUPING` : Adresse du contrat GroupingModule
   - `VITE_CHAIN_ID` : ID de la chaîne Aeneid Testnet

### Render (Backend)
1. Connecter le dépôt GitHub
2. Utiliser le fichier `render.yaml` à la racine pour configurer le service Node

3. Configurer le service Web :
   - Type : Python
   - Build command : `pip install -r requirements.txt`
   - Le paquet `Flask-CORS` doit être présent pour autoriser les requêtes CORS
   - Start command : `python -m flask run --host=0.0.0.0 --port=$PORT`
   - Type : Node
   - Build command : `npm install && npm run build`
   - Start command : `node server.js`
4. Configurer les variables d'environnement :
   - `FLASK_ENV` : production
   - `SECRET_KEY` : clé secrète pour JWT
   - `DATABASE_URL` : URL de la base de données
   - `IPFS_API_KEY` : Clé API pour IPFS (si applicable)
   - `CONTRACT_ADDRESSES` : Adresses des smart contracts
   - `TOMO_API_KEY` : Clé API pour l'intégration Tomo.inc
   - `TOMO_API_URL` : URL de l'API Tomo.inc
   - `COVALENT_API_KEY` : Clé API pour l'intégration Covalent
   - `COVALENT_API_URL` : URL de l'API Covalent
   - `AWS_ACCESS_KEY_ID` : Clé d'accès AWS pour SES
   - `AWS_SECRET_ACCESS_KEY` : Clé secrète AWS pour SES
   - `AWS_REGION` : Région AWS où SES est activé
   - `SES_FROM_EMAIL` : Adresse email vérifiée comme expéditeur

### Amazon SES

1. Activer le service SES dans la console AWS sur la région souhaitée.
2. Vérifier votre domaine ou l'adresse email expéditrice dans la section
   "Identités" de SES.
3. Copier les valeurs `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY` d'un
   utilisateur IAM autorisé à envoyer des emails.
4. Renseigner `AWS_REGION` et `SES_FROM_EMAIL` dans votre configuration
   d'environnement.

## Adresses des Smart Contracts (Testnet Aeneid)

Les adresses exactes des smart contracts déployés sur le testnet Aeneid se trouvent dans le fichier `smart-contracts/deployment-info.json`.

## Notes Importantes

1. Le frontend est actuellement configuré pour interagir avec les smart contracts sur le testnet Aeneid.
2. Les tests utilisateur ont validé les fonctionnalités de base, mais les fonctionnalités avancées restent à implémenter.
3. Le système de batching pour réduire les coûts de gaz est préparé structurellement mais pas complètement implémenté.
4. Les intégrations avec Tomo.inc, Covalent, Gelato et Amazon SES nécessiteront des clés API et des configurations supplémentaires.

## Prochaines Étapes

1. Déployer la version de base sur GitHub, Netlify et Render
2. Implémenter progressivement les fonctionnalités avancées dans la branche development
3. Tester chaque fonctionnalité avant de la fusionner dans la branche main
4. Mettre à jour la documentation au fur et à mesure des nouvelles implémentations
