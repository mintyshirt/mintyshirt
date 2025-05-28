# Spécification Technique et Fonctionnelle Finale de MintyShirt

## Vue d'ensemble

MintyShirt est une plateforme de merchandising Web3 innovante permettant aux créateurs de protéger leur propriété intellectuelle sur la blockchain Story Protocol, de vendre leurs designs sur des produits en impression à la demande via Gelato, et de partager les revenus avec leur communauté via des Royalty Tokens.

**Slogan** : "Success is shared"

## Architecture Fonctionnelle

### 1. Structure du Site

**Navigation principale (navbar sticky)**
- Home
- Accessories
- Categories (menu déroulant dans cet ordre précis) :
  - Créateurs de contenu
  - Musiciens
  - Jeux vidéo
  - Manga
  - BD & Animés
  - Crypto
  - NFT
  - Clubs sportifs
  - Séries
  - Films
  - Art visuel
  - Mode
  - Marques & entreprises
  - Autres
- Créateurs
- Royalty Tokens
- TokenSwap
- DesignHub
- Stats
- Switch de langue [EN / FR]
- Connexion / Création de compte

**Pages principales**
1. Homepage
2. Pages Catégories
3. Page Créateur
4. DesignHub
5. TokenSwap
6. Royalty Tokens
7. Dashboard Créateur
8. Dashboard Client/Fan

**Intégration avec réseaux sociaux**
- Possibilité pour les créateurs de connecter leur boutique MintyShirt à leurs réseaux sociaux
- Support pour YouTube Shopping, TikTok, Facebook et autres plateformes offrant des fonctionnalités d'achat

### 2. Blockchain et Propriété Intellectuelle

**Blockchain utilisée** : Story Protocol

**Fonctionnalités blockchain**
- Enregistrement des designs comme actifs IP
- Grouping module pour lier plusieurs designs à un même IP
- Gestion décentralisée des licences
- Émission et gestion des Royalty Tokens
- Traçabilité des forks et remixes
- Gestion des droits d'utilisation par l'IA

**Oracle**
- Utilisation de Chainlink pour la conversion entre monnaies fiat et cryptomonnaies
- Mises à jour régulières des taux sur la blockchain

**Vérification de tokens**
- **Solution interne** pour la vérification des tokens liés à l'écosystème Story Protocol (groupes de chat, affiliation, réductions)
- **Architecture hybride** :
  - Système interne pour les tokens Story Protocol
  - Tomo.inc pour la vérification en temps réel des tokens externes (uniquement pour le whitelisting)
  - Covalent pour les snapshots de tokens externes (uniquement pour le whitelisting)

### 3. Impression à la Demande

**Partenaire** : Gelato (non mentionné explicitement sur le site)

**Intégration**
- API pour la transmission automatique des commandes
- Ensemble du catalogue Gelato disponible
- Livraison mondiale automatisée

**Personnalisation d'emballage**
- Phase initiale : Personnalisation MintyShirt de base (étiquettes + cartes) à ~$1 par commande
- Phase ultérieure : Option de personnalisation complète pour les créateurs à leurs frais (~$2-3 supplémentaires par commande)
- Disparition de la marque Gelato sur les emballages personnalisés (possiblement encore visible sur les factures)

### 4. Système de Royalty Tokens

**Caractéristiques**
- Tokens représentant des droits à percevoir des redevances (non security tokens)
- Distribution automatique des revenus aux détenteurs
- Avantages exclusifs : accès au groupe privé, liens d'affiliation, réductions optionnelles sur le merch

**TokenSwap**
- Marché secondaire pour l'échange des Royalty Tokens
- Affichage des statistiques d'utilisation, nombre d'échanges et évolutions (avec disclaimer clair sur la nature non-financière)
- Commission de 2% sur les échanges secondaires

### 5. Programme d'Affiliation Token-gated

**Fonctionnement**
- Génération automatique d'un lien d'affiliation pour les détenteurs de tokens
- Lien actif tant que l'utilisateur détient au moins un token (ou le nombre défini par le créateur)
- Commission prédéfinie sur chaque vente réalisée via ce lien
- Tous les achats du client comptabilisés, même s'il arrive via un lien produit spécifique
- Possibilité de partager des produits individuels avec leur propre lien

**Dashboard Affiliation**
- Intégré comme onglet dans les dashboards créateur et client
- Pour créateurs : suivi des performances, gestion des affiliés
- Pour clients : gestion des liens, statistiques, retraits
- Bouton "Rejoindre le chat" à côté du nom du groupe de chat lié au token

### 6. DesignHub

**Fonctionnalités**
- Exploration des IP Assets disponibles
- Distinction claire entre :
  - **Licence/Remix** : Utilisation ou modification d'un design existant sous conditions, l'IP d'origine reste propriétaire
  - **Fork (IP enfant)** : Création d'une nouvelle IP dérivée mais distincte, avec sa propre identité
- Indication claire si l'IP est accessible à l'IA
- Traçabilité des générations d'IP (parent/enfant)
- Bouton permettant de proposer une co-création d'IP commun

**Options de licence avancées**
- Limitation du nombre d'utilisateurs pouvant utiliser la licence
- Limitation du nombre de niveaux de dérivations autorisés
- Option d'approbation manuelle des demandes de licence
- Contrôle d'accès pour les intelligences artificielles

**Gestion de fin de licence**
- Notification au licencié avant expiration (dashboard + email)
- Retrait automatique des produits 3 jours après expiration
- Option de déréférencement manuel par le créateur original
- Redirection des revenus au créateur original pendant la période de grâce

**Recommandation d'utilisation**
- Recommandation d'utiliser les designs loués/remixés ET les forks uniquement sur MintyShirt

### 7. Système de Connexion et Wallets

**Options de connexion**
- Wallets externes (MetaMask, Phantom, etc.)
- Wallet intégré créé avec email (Account Abstraction)
- Connexion traditionnelle pour les achats sans wallet

**Vérification de tokens**
- Système interne de vérification en temps réel pour les tokens Story Protocol
- Architecture hybride pour le whitelisting (Tomo.inc et Covalent pour tokens externes)
- Distinction claire entre vérification en temps réel et snapshot

### 8. Système de Paiement

**Options de paiement**
- Pour le merch : uniquement monnaies fiat au lancement
- Pour les tokens : cryptomonnaies acceptées (IP token, Bitcoin, USDT, USDC) et fiat avec KYC

**Modèle économique**
- Commission intégrée au prix de fabrication (marge ajoutée aux prix Gelato)
- Prix final présenté au créateur pour qu'il fixe son prix de vente
- 2,5% sur les ventes initiales de Royalty Tokens
- 2% sur les échanges secondaires sur TokenSwap

**Gestion fiscale**
- Système modulaire adaptable aux différentes juridictions
- Calcul automatique de la TVA/VAT selon la localisation
- Support du système VAT MOSS pour l'UE
- Génération automatique des factures conformes
- Collecte des documents fiscaux requis selon les juridictions (W-9, W-8BEN, numéro TVA, etc.)

### 9. Gestion des Frais de Gas

**Répartition**
- Enregistrement d'un IP sur Story Protocol : payé par le créateur
- Enregistrement d'un design sous l'IP : payé par le créateur
- Création d'un Royalty Token : payé par le créateur
- Achat initial d'un Royalty Token : payé par le client
- Vente secondaire d'un Royalty Token : partagé entre acheteur et vendeur
- Demande de licence via DesignHub : payé par le créateur dérivateur
- Versement automatique de royalties : payé par la plateforme MintyShirt via un système batché (regroupement de plusieurs versements en une seule transaction pour réduire les coûts)

**Coût de déploiement**
- Déploiement du smart contract principal sur Story Protocol : estimé entre 0.1 et 0.3 ETH selon la complexité

### 10. Groupes de Chat Privés

**Structure**
- Un seul groupe de chat principal par créateur
- Sous-groupes accessibles selon les tokens détenus
- Interface simple similaire à Telegram
- Accès conditionné à la détention d'au moins un token par défaut (nombre modifiable par le créateur)
- Si le créateur modifie le nombre de tokens requis, cela n'affecte pas les membres déjà présents
- Perte d'accès si l'utilisateur ne possède plus le token requis

**Fonctionnalités**
- Messagerie simple
- Partage de médias
- Sondages
- Message d'avertissement éducatif au créateur envoyé une seule fois à la création du groupe, après le message de bienvenue

**Accès**
- Bouton "Rejoindre le chat" sur la page du créateur
- Accès depuis le dashboard utilisateur (onglet "Mes Groupes Privés")
- Accès depuis l'onglet "Affiliation" à côté du lien d'affiliation correspondant
- Vérification en temps réel de la détention de tokens

### 11. Whitelisting (Vente Privée)

**Fonctionnalités**
- Renommé "Vente Privée (Whitelisting)" pour les non-initiés au Web3
- Mode Simple et Mode Avancé
- Collecte d'emails, handles ou adresses wallet
- Questions personnalisées
- Vérification via OAuth
- Token Check (vérification en temps réel ou snapshot)
- Intégrations avec Zealy, Side.xyz et Galxe
- Service d'emailing intégré via Amazon SES
- Interface utilisateur entièrement personnalisée
- Option pour définir le nombre de jours avant passage automatique en vente publique

## Parcours Utilisateurs

### 1. Parcours Créateur

1. **Création du compte**
   - Inscription via wallet externe ou wallet intégré
   - Activation du profil créateur

2. **Enregistrement de la propriété intellectuelle**
   - Enregistrement d'un design initial pour la création de l'actif IP
   - Utilisation du grouping module pour lier d'autres designs à l'actif IP principal
   - Configuration des licences (remix, IA, usage commercial)

3. **Émission de Royalty Tokens**
   - Configuration du nombre de tokens, pourcentage conservé, prix initial
   - Option de prévente en whitelist ou vente publique directe
   - Définition du nombre de jours avant passage automatique en vente publique

4. **Lancement de la boutique**
   - Téléversement des designs
   - Configuration des produits
   - Paramétrage des réductions optionnelles pour les détenteurs de tokens
   - Option de connexion avec les plateformes de réseaux sociaux (YouTube Shopping, etc.)

5. **Gestion du dashboard**
   - Suivi des ventes, royalties, IP, affiliés
   - Gestion des demandes de licence
   - Communication avec les détenteurs de tokens
   - Gestion fiscale selon la localisation

### 2. Parcours Client/Fan

1. **Navigation sans inscription**
   - Exploration des produits, créateurs et collections
   - Recherche par créateur ou design

2. **Création de compte pour achats**
   - Achat de merchandising sans wallet
   - Paiement par carte bancaire uniquement pour le merch (au lancement)

3. **Interaction avec les tokens**
   - Connexion via wallet externe ou wallet intégré
   - Achat de Royalty Tokens
   - Accès aux avantages exclusifs (groupe privé, affiliation, réductions)
   - Échange de tokens sur TokenSwap

## Interface Utilisateur

**Design global**
- Style tech inspiré d'OpenSea
- Effets interactifs au survol des cartes et boutons
- Expérience Web2-like avec transactions blockchain en arrière-plan
- Responsive et adapté mobile

**Dashboards**
- Dashboard créateur avec onglets dédiés (Ventes, IP, Tokens, Affiliation, etc.)
- Dashboard client avec onglets dédiés (Achats, Tokens, Affiliation, Groupes privés)
- Possibilité de basculer entre les deux profils sans déconnexion

**Classement des créateurs**
- Système hybride avec pondération ajustable :
  - Volume de ventes (30%)
  - Engagement communautaire (25%)
  - Nouveauté (15%)
  - Qualité des designs (15%)
  - Activité de licence/remix (15%)
- Filtres par catégorie, localisation, date d'arrivée, nombre de collections

## Proposition pour le Groupe de Chat Privé

**Interface**
- Design simple et intuitif similaire à Telegram
- Barre latérale avec liste des sous-groupes accessibles
- Zone principale de conversation avec messages chronologiques
- Zone de saisie en bas avec options d'envoi de médias

**Fonctionnalités**
- Vérification automatique de la détention de tokens à l'entrée
- Sous-groupes accessibles selon les tokens détenus
- Notifications pour les nouveaux messages
- Partage de médias (images, liens, etc.)
- Épinglage de messages importants par le créateur
- Option pour le créateur de programmer des événements/annonces
- Fonctionnalité de sondages

**Considérations juridiques**
- Message d'avertissement éducatif au créateur envoyé une seule fois à la création du groupe, après le message de bienvenue :
  "Pour protéger votre communauté et vous-même, nous vous recommandons d'éviter les discussions sur la valeur financière des tokens, les promesses de gains, ou les comparaisons avec des investissements. Ces sujets pourraient exposer votre projet à des risques réglementaires."

## Considérations Techniques

**Frontend**
- React / Next.js
- Design responsive avec Tailwind CSS
- Animations et effets interactifs

**Backend**
- API RESTful pour les interactions non-blockchain
- Intégration avec Story Protocol pour la gestion des IP
- Intégration avec Gelato pour l'impression à la demande
- Système de paiement hybride (crypto + fiat)

**Blockchain**
- Smart contracts sur Story Protocol
- Intégration de Chainlink pour les oracles de prix
- Système batché pour optimiser les coûts de gas

**Sécurité**
- KYC pour les achats de tokens en fiat
- Vérification de la détention de tokens pour l'accès aux fonctionnalités exclusives
- Protection des données utilisateurs
- Audit interne régulier :
  - Audit complet mensuel de l'ensemble du système
  - Audits ciblés après chaque mise à jour significative
  - Surveillance continue automatisée
  - Tests de pénétration trimestriels
- Audit externe professionnel pour les smart contracts avant déploiement

**Intégrations**
- Zealy, Side.xyz et Galxe pour les campagnes d'engagement communautaire
- Amazon SES pour l'emailing
- Architecture hybride pour la vérification de tokens :
  - Système interne pour les tokens Story Protocol
  - Tomo.inc et Covalent pour les tokens externes (whitelisting uniquement)

## Fonctionnalités Additionnelles à Considérer

**Génération d'images par IA**
- Fonctionnalité différée au lancement
- Intégration potentielle de Stable Diffusion via Replicate dans une phase ultérieure
- Quota gratuit limité et option payante pour utilisations intensives

**Licencing et redevances**
- Pourcentage de redevance appliqué au chiffre d'affaires (et non au bénéfice)
- Système transparent et facilement vérifiable

## Recommandations d'Implémentation

1. **Phase 1 : MVP**
   - Fonctionnalités de base : enregistrement IP, émission de tokens, vente de merch
   - Intégration Story Protocol et Gelato
   - Interface utilisateur simplifiée
   - Participation au Buildathon Encode/Story Protocol

2. **Phase 2 : Expansion**
   - TokenSwap complet
   - Programme d'affiliation
   - Groupes de chat privés
   - DesignHub avec licences et remixes

3. **Phase 3 : Optimisation**
   - Système batché pour les frais de gas
   - Amélioration de l'UX
   - Internationalisation complète
   - Fonctionnalités avancées de whitelisting
   - Intégration avec les plateformes de réseaux sociaux

## Limitations Initiales

- Recommandation d'utiliser les designs loués/remixés et les forks uniquement sur MintyShirt pour garantir le paiement des royalties
- Fonctionnalités de création de designs non incluses (téléversement uniquement)
- Tutoriels intégrés remplacés par des bulles d'information
- Paiements en fiat uniquement pour le merch au lancement
