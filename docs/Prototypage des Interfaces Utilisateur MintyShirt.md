# Prototypage des Interfaces Utilisateur MintyShirt

Ce document présente les maquettes conceptuelles des principales interfaces utilisateur de MintyShirt, conformément à la spécification technique validée.

## 1. Page d'Accueil

La page d'accueil est conçue pour offrir une expérience immersive et intuitive, mettant en avant les créateurs, les collections populaires et les fonctionnalités clés de MintyShirt.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Connexion] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │                  BANNIÈRE PRINCIPALE ANIMÉE                     │   │
│  │                                                                 │   │
│  │  "Success is shared" - Protégez votre IP, vendez votre merch,   │   │
│  │             partagez vos revenus avec votre communauté          │   │
│  │                                                                 │   │
│  │                     [Découvrir] [Créer]                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  CRÉATEURS POPULAIRES                                       Voir tous > │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │[Avatar 1]│  │[Avatar 2]│  │[Avatar 3]│  │[Avatar 4]│  │[Avatar 5]│  │
│  │  Nom 1   │  │  Nom 2   │  │  Nom 3   │  │  Nom 4   │  │  Nom 5   │  │
│  │Catégorie1│  │Catégorie2│  │Catégorie3│  │Catégorie4│  │Catégorie5│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                                         │
│  COLLECTIONS TENDANCE                                      Voir toutes >│
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │                  │  │                  │  │                  │      │
│  │  [Image Coll.1]  │  │  [Image Coll.2]  │  │  [Image Coll.3]  │      │
│  │                  │  │                  │  │                  │      │
│  │  Nom Collection  │  │  Nom Collection  │  │  Nom Collection  │      │
│  │  Créateur        │  │  Créateur        │  │  Créateur        │      │
│  │  [Voir]          │  │  [Voir]          │  │  [Voir]          │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
│                                                                         │
│  COMMENT ÇA MARCHE                                                      │
│  ┌────────────┐      ┌────────────┐      ┌────────────┐                │
│  │            │      │            │      │            │                │
│  │  [Icône 1] │      │  [Icône 2] │      │  [Icône 3] │                │
│  │            │      │            │      │            │                │
│  │ 1. Protégez│      │2. Vendez   │      │3. Partagez │                │
│  │ votre IP   │      │votre merch │      │vos revenus │                │
│  │            │      │            │      │            │                │
│  └────────────┘      └────────────┘      └────────────┘                │
│                                                                         │
│  DERNIERS ROYALTY TOKENS                                   Voir tous >  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│  │ [Logo Token 1] │  │ [Logo Token 2] │  │ [Logo Token 3] │            │
│  │ Nom Token      │  │ Nom Token      │  │ Nom Token      │            │
│  │ Créateur       │  │ Créateur       │  │ Créateur       │            │
│  │ Prix: 0.xx ETH │  │ Prix: 0.xx ETH │  │ Prix: 0.xx ETH │            │
│  │ [Acheter]      │  │ [Acheter]      │  │ [Acheter]      │            │
│  └────────────────┘  └────────────────┘  └────────────────┘            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 2. Page "Créateurs" (Navbar)

Cette page présente l'ensemble des créateurs classés par popularité et activité récente.

### En-tête de page
- Logo MintyShirt
- Navbar sticky : Accueil | Accessoires | Catégories | Royalty Tokens | TokenSwap | Stats | DesignHub | Créateurs
- Switch de langue [EN / FR]
- Connexion / Création de compte

### Titre de la page
- **Nos Créateurs**
- Slogan : Découvrez les talents qui donnent vie à MintyShirt.

### Barre de recherche et filtres
- Barre de recherche avec placeholder : "Rechercher un créateur par nom ou catégorie..."
- Filtres (dropdown) :
  - Trier par : [Plus Populaires] [Nouveaux Ajouts] [Plus Actifs (ventes merch)] [Plus Actifs (échanges tokens)] [Nombre d'IPs]
  - Catégories : [Créateurs de contenu] [Musiciens] [Mangas] [BD & Animés] [Jeux Vidéo] [Séries] [Films] [Art visuel] [Clubs Sportifs] [Crypto] [Collections de NFTs] [Marques & Entreprises]
  - Pays : sélection déroulante

### Grille des créateurs
- Affichage en grille responsive de cartes de créateurs selon les filtres.

#### Contenu d'une carte
- Logo / Avatar du créateur
- Nom du créateur / Handle
- Catégorie principale
- Indicateurs clés :
  - Nombre d'IP Assets
  - Royalty Tokens émis
  - Volume TokenSwap (30j)
  - Revenus merch (30j)
  - Membres groupe privé
- Bouton : Voir la page du créateur

### Notes de développement
- Les données affichées proviennent des statistiques publiques des créateurs.
- Les chiffres sont actualisés toutes les 24h.

## 3. Dashboard Créateur

Le dashboard créateur offre une vue complète et intuitive de toutes les activités et fonctionnalités disponibles pour les créateurs.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Profil▼] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐                                                            │
│  │         │  Bienvenue, [Nom du Créateur]                              │
│  │[Avatar] │  Statut: Vérifié ✓                                         │
│  │         │  [Voir ma boutique] [Éditer mon profil]                    │
│  └─────────┘                                                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Ventes │ IP Assets │ Tokens │ Affiliation │ Licences │ Paramètres   ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  APERÇU                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│
│  │              │  │              │  │              │  │              ││
│  │ Ventes Totales│  │Revenus Tokens │  │ Détenteurs   │  │ Licences     ││
│  │              │  │              │  │              │  │              ││
│  │    1,234     │  │   0.5 ETH    │  │     78       │  │     12       ││
│  │  +12% / mois │  │ +5% / semaine│  │ +3 cette sem.│  │ 2 en attente ││
│  │              │  │              │  │              │  │              ││
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘│
│                                                                         │
│  ACTIVITÉ RÉCENTE                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ • Nouvelle vente: T-shirt "Design XYZ" - il y a 2 heures            ││
│  │ • Nouveau détenteur de token: @username - il y a 5 heures           ││
│  │ • Demande de licence reçue pour "Design ABC" - il y a 1 jour        ││
│  │ • Distribution de revenus: 0.1 ETH - il y a 2 jours                 ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ACTIONS RAPIDES                                                        │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐            │
│  │                │  │                │  │                │            │
│  │ [Ajouter IP]   │  │ [Créer Token]  │  │[Ajouter Produit]│            │
│  │                │  │                │  │                │            │
│  └────────────────┘  └────────────────┘  └────────────────┘            │
│                                                                         │
│  STATISTIQUES DE VENTE                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                                                                     ││
│  │                      [Graphique des ventes]                         ││
│  │                                                                     ││
│  │                                                                     ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 4. Page d'un Créateur Spécifique

Cette section décrit l'interface dédiée à un créateur individuel, accessible depuis la page Créateurs ou via un lien direct.

**En-tête de page**
- Logo MintyShirt
- Navbar sticky : Accueil | Accessoires | Catégories | Royalty Tokens | TokenSwap | Stats | DesignHub | Créateurs
- Switch de langue [EN / FR]
- Connexion / Création de compte

**Section Profil du Créateur**
- Photo de couverture personnalisable
- Logo / Avatar du créateur
- Nom du créateur
- Catégorie : Musicien, Manga, Art visuel...
- Réseaux sociaux : icônes cliquables (Twitter, Instagram, Discord, etc.)
- Boutons d'action :
  - Voir la boutique → lien vers les produits merch du créateur
  - Voir les Royalty Tokens → scroll vers la section tokens de la page
  - Rejoindre le groupe privé (uniquement si l'utilisateur détient un token)

**Section "À Propos du Créateur"**
- Texte court présentant son univers artistique, ses inspirations, ses projets à venir.
- Option : "Afficher plus" si le texte est long.

**Section "Designs et Propriétés Intellectuelles"**
- Titre : Mes Designs
- Filtres et options d'affichage :
  - Trier par : Nouveaux, Populaires, En licence, Remixés
  - Filtres : Disponible sur merch / Disponible en licence / IP associé
- Affichage en grille des designs :
  - Image du design
  - Titre du design
  - Tags associés
  - IP Asset associé (lien vers la page IP si applicable)
  - Boutons : Voir – Proposer une collaboration

**Section "Royalty Tokens"**
- Titre : Mes Royalty Tokens
- Présentation des tokens émis par le créateur
- Affichage en tableau ou cartes :
  - Nom Token
  - IP lié (avec lien vers la page de l'IP)
  - Prix initial
  - % Royalties (part de revenus redistribuée)
  - Vente en cours (indicateur visuel)
  - Lien TokenSwap (acheter/vendre ce token)

**Section "Collaborations"**
- Titre : Mes Collaborations
- Designs ou IP co-créés avec d'autres artistes
- Indication des partenaires et lien vers les IP Assets co-créés
- Statistiques si disponibles : ventes, forks, remix...

**Section "Gestion des IP" (pour le créateur connecté)**
- Titre : Mes Actifs IP
- Liste des IP Assets avec titre, image et statut (actif/licencié/remixé)
- Bouton : Créer un nouvel IP Asset
- Filtres : Actif, Forké, Loué, Remixé
- IP disponibles à la licence ou au remix
- Voir les forks créés à partir de ses designs
- Notifications si demandes en attente

**Section "Statistiques Générales du Créateur"**
- Titre : Aperçu de mes performances
- Nombre de ventes total
- Revenus générés
- Nombre de tokens en circulation
- Nombre de fans détenteurs
- Graphique de performance

**Section "Avantages Communauté"**
- Titre : Vos Avantages Exclusifs
- Lien vers le groupe privé MintyShirt (chat)
- Avantages disponibles : réductions, affiliation, accès à des contenus
- Accès au groupe privé si l'utilisateur détient le token

**Pied de page**
- Liens utiles (CGV, Politique de confidentialité, À propos, Contact, Moyens de paiement, Programme d’affiliation Token-Gated)
- Icônes de réseaux sociaux


## 5. DesignHub

L'interface DesignHub permet d'explorer, de licencier et de remixer les designs protégés par IP.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Connexion] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  DesignHub                                                              │
│  Explorez, louez, remixez les designs les plus originaux du web.        │
│  Ici, chaque design est une propriété intellectuelle protégée sur la    │
│  blockchain.                                                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ [Recherche...]  Catégories▼  Statut▼  Type▼  Ordre▼  Pays▼  [Filtrer]││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  RÉSULTATS (125)                                                        │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐│
│  │                    │  │                    │  │                    ││
│  │   [Miniature IP]   │  │   [Miniature IP]   │  │   [Miniature IP]   ││
│  │                    │  │                    │  │                    ││
│  │ Nom de l'IP        │  │ Nom de l'IP        │  │ Nom de l'IP        ││
│  │ [Avatar] Créateur  │  │ [Avatar] Créateur  │  │ [Avatar] Créateur  ││
│  │ [IP Principal]     │  │ [Fork - Gen 2]     │  │ [IP Principal]     ││
│  │ [Voir l'IP]        │  │ [Voir l'IP]        │  │ [Voir l'IP]        ││
│  └────────────────────┘  └────────────────────┘  └────────────────────┘│
│                                                                         │
│  ┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐│
│  │                    │  │                    │  │                    ││
│  │   [Miniature IP]   │  │   [Miniature IP]   │  │   [Miniature IP]   ││
│  │                    │  │                    │  │                    ││
│  │ Nom de l'IP        │  │ Nom de l'IP        │  │ Nom de l'IP        ││
│  │ [Avatar] Créateur  │  │ [Avatar] Créateur  │  │ [Avatar] Créateur  ││
│  │ [IP Principal]     │  │ [IP Principal]     │  │ [Fork - Gen 3]     ││
│  │ [Voir l'IP]        │  │ [Voir l'IP]        │  │ [Voir l'IP]        ││
│  └────────────────────┘  └────────────────────┘  └────────────────────┘│
│                                                                         │
│  [Charger plus de résultats]                                            │
│                                                                         │
│  ℹ️ Infobulles disponibles pour "Fork", "Licence", "IP Asset", "Remix", │
│     "Utilisation IA"                                                    │
│                                                                         │
│  Propulsé par Story Protocol                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 6. Page Détaillée d'un IP Asset

Cette page présente les détails complets d'un actif IP, avec ses conditions de licence et options.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Connexion] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ← Retour à DesignHub                                                   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Nom de l'IP                                       [Badge: IP Principal]││
│  │ [Avatar] Créateur: Nom du Créateur                                  ││
│  │ [Bouton: Proposer une co-création]                                  ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌───────────────────────┐  ┌───────────────────────────────────────────┐
│  │                       │  │ Description de l'IP                       │
│  │                       │  │ Lorem ipsum dolor sit amet, consectetur   │
│  │   [Galerie des        │  │ adipiscing elit. Nullam auctor, nisl eget │
│  │    designs de l'IP]   │  │ eleifend tincidunt, nunc nunc aliquam     │
│  │                       │  │ magna, vel tincidunt nunc nunc vel magna. │
│  │                       │  │                                           │
│  └───────────────────────┘  └───────────────────────────────────────────┘
│                                                                         │
│  CONDITIONS DE LICENCE                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ✅ Usage commercial autorisé       ✅ Remix autorisé                 ││
│  │ ❌ Usage par IA non autorisé       ✅ Paiement initial requis        ││
│  │ 🔄 Pourcentage de royalties: 10%   ✅ Clause MintyShirt-only         ││
│  │ ♻️ Renouvellement automatique: activé                               ││
│  │                                                                     ││
│  │ [Faire une demande de licence]                                      ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ROYALTY TOKEN LIÉ                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Nom du token                                                        ││
│  │ Partage de revenus: 25%                                             ││
│  │ Tokens émis: 10,000                                                 ││
│  │ Détenteurs: 78                                                      ││
│  │                                                                     ││
│  │ [Voir le token]                                                     ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  STATISTIQUES                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Licencié 12 fois                                                    ││
│  │ 3 forks créés                                                       ││
│  │ Revenus générés: 0.8 ETH                                            ││
│  │                                                                     ││
│  │ Forks validés:                                                      ││
│  │ • [Lien] Fork "Nom du fork 1" par Créateur X                        ││
│  │ • [Lien] Fork "Nom du fork 2" par Créateur Y                        ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  Cet IP Asset est protégé sur la blockchain via Story Protocol.         │
│  Toutes les actions de licence, fork, et autres sont traçables et       │
│  vérifiables on-chain.                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 7. TokenSwap

L'interface TokenSwap permet d'explorer et d'échanger les Royalty Tokens.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Connexion] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  TokenSwap - Marché secondaire des Royalty Tokens                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ [Recherche...]                                                      ││
│  │                                                                     ││
│  │ Catégories:                                                         ││
│  │ [Créateurs de contenu][Musiciens][Mangas][BD & Animés][Jeux vidéos] ││
│  │ [Séries][Films][Art visuel][Clubs sportifs][Crypto][Collections de  ││
│  │ NFTs][Marques & Entreprises]                                        ││
│  │                                                                     ││
│  │ Tri: [Top ventes▼]  Prix: Min[___] Max[___]  [Appliquer]            ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  TABLEAU DES TOKENS LISTÉS                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Logo│Nom du token │Créateur│Dernier prix│Évolution 24h│Volume│En vente││
│  ├─────┼────────────┼────────┼────────────┼─────────────┼──────┼────────┤│
│  │ 🔶  │Royalties_MX│MangaX  │0.032 ETH   │↗ +5.2%      │12 ETH│14     ││
│  │     │            │        │($xx.xx)    │             │      │[Acheter]││
│  ├─────┼────────────┼────────┼────────────┼─────────────┼──────┼────────┤│
│  │ 🔷  │MerchToken_D│DJ Nova │0.012 ETH   │↘ -3.1%      │4 ETH │6      ││
│  │     │            │        │($xx.xx)    │             │      │[Acheter]││
│  ├─────┼────────────┼────────┼────────────┼─────────────┼──────┼────────┤│
│  │ 🔴  │Royalties_Ri│RickFan │0.021 ETH   │➖ 0%        │8 ETH │10     ││
│  │     │            │        │($xx.xx)    │             │      │[Acheter]││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  [Charger plus de résultats]                                            │
│                                                                         │
│  ⚠️ INFORMATION LÉGALE                                                  │
│  Les Royalty Tokens proposés sur MintyShirt ne sont pas des security    │
│  tokens. Ils ne constituent pas une promesse de gain financier, mais    │
│  représentent un droit à redevance lié à l'usage commercial d'une œuvre │
│  ou d'une marque, déterminé par le créateur lui-même. MintyShirt ne     │
│  garantit aucun rendement. Le détenteur touche des revenus uniquement   │
│  si l'activité du créateur génère des ventes.                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 8. Groupe de Chat Privé

L'interface du groupe de chat privé token-gated, inspirée de Telegram.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Profil▼] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Groupe Privé: [Nom du Créateur] Lounge                                 │
│                                                                         │
│  ┌───────────────────┐  ┌─────────────────────────────────────────────┐ │
│  │                   │  │                                             │ │
│  │ SOUS-GROUPES      │  │ [Avatar] Créateur                           │ │
│  │ ● Groupe Principal │  │ Bienvenue dans le groupe privé !           │ │
│  │   (Tous)          │  │ 12:30                                       │ │
│  │                   │  │                                             │ │
│  │ ○ Collection A    │  │ [Avatar] Créateur                           │ │
│  │   (Token A requis) │  │ Pour protéger votre communauté et vous-même│ │
│  │                   │  │ nous vous recommandons d'éviter les         │ │
│  │ ○ Collection B    │  │ discussions sur la valeur financière des    │ │
│  │   (Token B requis) │  │ tokens, les promesses de gains, ou les     │ │
│  │                   │  │ comparaisons avec des investissements.      │ │
│  │ ○ Collection C    │  │ Ces sujets pourraient exposer votre projet  │ │
│  │   (Token C requis) │  │ à des risques réglementaires.              │ │
│  │                   │  │ 12:31                                       │ │
│  │ MEMBRES (78)      │  │                                             │ │
│  │ ● Créateur (Admin) │  │ [Avatar] Membre1                           │ │
│  │ ● Membre1         │  │ Salut tout le monde ! Ravi de faire partie  │ │
│  │ ● Membre2         │  │ de cette communauté !                       │ │
│  │ ● Membre3         │  │ 12:45                                       │ │
│  │ ● Membre4         │  │                                             │ │
│  │ ...               │  │ [Avatar] Membre2                            │ │
│  │                   │  │ J'adore la nouvelle collection !            │ │
│  │                   │  │ 12:47                                       │ │
│  │                   │  │                                             │ │
│  │                   │  │ [Avatar] Créateur                           │ │
│  │                   │  │ Merci ! J'organise un sondage pour connaître│ │
│  │                   │  │ vos préférences pour la prochaine collection│ │
│  │                   │  │ 13:01                                       │ │
│  │                   │  │                                             │ │
│  │                   │  │ [SONDAGE]                                   │ │
│  │                   │  │ Quelle thématique préférez-vous ?           │ │
│  │                   │  │ ○ Espace (12 votes)                         │ │
│  │                   │  │ ○ Océan (8 votes)                           │ │
│  │                   │  │ ○ Forêt (5 votes)                           │ │
│  │                   │  │ 13:02                                       │ │
│  │                   │  │                                             │ │
│  └───────────────────┘  │                                             │ │
│                         └─────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ [📎] Écrire un message...                                 [📷] [📄] ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 9. Onglet Affiliation (Dashboard Créateur)

L'interface de gestion des affiliations pour les créateurs.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Profil▼] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐                                                            │
│  │         │  Bienvenue, [Nom du Créateur]                              │
│  │[Avatar] │  Statut: Vérifié ✓                                         │
│  │         │  [Voir ma boutique] [Éditer mon profil]                    │
│  └─────────┘                                                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Ventes │ IP Assets │ Tokens │ Affiliation │ Licences │ Paramètres   ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  STATISTIQUES GÉNÉRALES                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │                  │  │                  │  │                  │      │
│  │Revenus Affiliation│  │% Ventes via Affil.│  │ Affiliés Actifs  │      │
│  │                  │  │                  │  │                  │      │
│  │    1,523 €       │  │      38%         │  │      127        │      │
│  │                  │  │                  │  │                  │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
│                                                                         │
│  Top affilié du mois: @CryptoFan42                                      │
│                                                                         │
│  GRAPHIQUE DE PERFORMANCE                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                                                                     ││
│  │                  [Graphique d'évolution]                            ││
│  │                                                                     ││
│  │                                                                     ││
│  │ Plage: [7j] [30j] [3 mois] [Personnalisé]                           ││
│  │ Vue: [Montant généré (€)] / [Nombre de ventes]                      ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  AFFILIÉS ACTIFS                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Nom/Handle│Wallet      │Ventes│Montant│% CA total│Dernière activité ││
│  ├───────────┼────────────┼──────┼───────┼──────────┼─────────────────┤│
│  │@CryptoFan42│0xabc…1234 │24    │312 €  │9.5%      │il y a 2 jours   ││
│  │           │            │      │       │          │[Message][Détails]││
│  ├───────────┼────────────┼──────┼───────┼──────────┼─────────────────┤│
│  │@NFTQueen  │0xdef…5678 │14    │185 €  │6.3%      │il y a 4 jours   ││
│  │           │            │      │       │          │[Message][Détails]││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  PARAMÉTRAGE DU PROGRAMME                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ✅ Activer le programme d'affiliation [✓]                           ││
│  │ Commission à verser à l'affilié: [ 10 % ]                           ││
│  │ Produits concernés: [Tous] ou [Sélection manuelle]                  ││
│  │ Condition: détenir au moins 1 token associé à cet actif IP          ││
│  │ Afficher un lien affilié global vers la boutique: [✓]               ││
│  │ Afficher les liens produits individuels: [✓]                        ││
│  │                                                                     ││
│  │ Lien d'affiliation par défaut:                                      ││
│  │ mintyshirt.com/shop/votre-boutique?ref=abcd1234                     ││
│  │                                                                     ││
│  │ [Enregistrer les modifications]                                     ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 10. Onglet Affiliation (Dashboard Client)

L'interface de gestion des affiliations pour les clients/fans.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Profil▼] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────┐                                                            │
│  │         │  Bienvenue, [Nom du Client]                                │
│  │[Avatar] │  [Voir mon profil] [Éditer mon profil]                     │
│  │         │                                                            │
│  └─────────┘                                                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Achats │ Tokens │ Affiliation │ Groupes Privés │ Paramètres         ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  LIENS D'AFFILIATION DISPONIBLES                                        │
│  Condition: détenir au moins 1 Royalty Token émis par le créateur       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Créateur: @NeoWear                                                  ││
│  │                                                                     ││
│  │ Lien d'affiliation:                                                 ││
│  │ mintyshirt.com/shop/neowear?ref=abc123                              ││
│  │ [ Partager] [ Copier] [ Voir les produits]                          ││
│  │                                                                     ││
│  │ Groupe privé MintyShirt: NeoWear Lounge                             ││
│  │ [➡️ Rejoindre le chat]                                              ││
│  │                                                                     ││
│  │ Accès: 1 Royalty Token détenu                                       ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Créateur: @PixelDrop                                                ││
│  │                                                                     ││
│  │ Lien d'affiliation:                                                 ││
│  │ mintyshirt.com/shop/pixeldrop?ref=xyz987                            ││
│  │ [ Partager] [ Copier] [ Voir les produits]                          ││
│  │                                                                     ││
│  │ Groupe privé MintyShirt: PixelDrop Crew                             ││
│  │ [➡️ Rejoindre le chat]                                              ││
│  │                                                                     ││
│  │ Accès: 2 Royalty Tokens détenus                                     ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  STATISTIQUES DE MES LIENS                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Créateur  │Clics│Ventes générées│Gains estimés│Statut               ││
│  ├───────────┼─────┼───────────────┼─────────────┼─────────────────────┤│
│  │@NeoWear   │154  │18 ventes      │72 €         │En attente de paiement││
│  ├───────────┼─────┼───────────────┼─────────────┼─────────────────────┤│
│  │@PixelDrop │72   │7 ventes       │28 €         │Payé (Avril)         ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  RETRAITS                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Solde disponible: 102 €                                             ││
│  │ [ Demander un retrait]                                              ││
│  │                                                                     ││
│  │ Choix: [Crypto] ou [Fiat]                                           ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 11. Formulaire de Whitelisting (Vente Privée)

L'interface du formulaire de whitelisting pour les créateurs.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo MintyShirt]    Home  Accessories  Categories▼  Créateurs  ...  [FR/EN] [Profil▼] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Vente Privée (Whitelisting)                                            │
│                                                                         │
│  [Mode Simple ⚪] [Mode Avancé ⚫]                                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ CONFIGURATION DE LA VENTE PRIVÉE                                    ││
│  │                                                                     ││
│  │ Nom de la vente: [_______________________]                          ││
│  │ Description: [_______________________]                              ││
│  │ Date de début: [__/__/____]  Heure: [__:__]                         ││
│  │ Passage automatique en vente publique après: [__] jours             ││
│  │                                                                     ││
│  │ MÉTHODE DE COLLECTE                                                 ││
│  │ [✓] Email (recommandé pour l'envoi du lien)                         ││
│  │ [ ] Handle (Twitter, Discord, etc.)                                 ││
│  │ [ ] Adresse de wallet                                               ││
│  │                                                                     ││
│  │ QUESTIONS PERSONNALISÉES                                            ││
│  │ ➕ Ajouter une question                                             ││
│  │   Type: [Texte libre▼] [Choix multiple▼] [Oui/Non▼]                 ││
│  │   Obligatoire: [✓] Oui [ ] Non                                      ││
│  │                                                                     ││
│  │ VÉRIFICATION VIA OAUTH                                              ││
│  │ [ ] Activer la vérification d'abonnement                            ││
│  │   Réseaux sociaux: [✓] Twitter [ ] Discord                          ││
│  │                                                                     ││
│  │ TOKEN CHECK                                                         ││
│  │ [ ] Vérification en temps réel (Tomo.inc)                           ││
│  │   Adresse du contrat: [_______________________]                     ││
│  │   Nombre minimum de tokens: [__]                                    ││
│  │                                                                     ││
│  │ [ ] Snapshot (Covalent)                                             ││
│  │   Adresse du contrat: [_______________________]                     ││
│  │   Date du snapshot: [__/__/____]  Heure: [__:__]                    ││
│  │   Nombre minimum de tokens: [__]                                    ││
│  │                                                                     ││
│  │ INTÉGRATIONS                                                        ││
│  │ [ ] Zealy                                                           ││
│  │   Lien de la campagne: [_______________________]                    ││
│  │                                                                     ││
│  │ [ ] Side.xyz                                                        ││
│  │   Lien de la campagne: [_______________________]                    ││
│  │                                                                     ││
│  │ [ ] Galxe                                                           ││
│  │   Lien de la campagne: [_______________________]                    ││
│  │                                                                     ││
│  │ [Créer la vente privée]                                             ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Prochaines Étapes

1. **Développement des maquettes interactives** avec des outils comme Figma
2. **Tests utilisateurs** sur les parcours clés
3. **Ajustements UX/UI** basés sur les retours
4. **Intégration avec les composants Web3** (connexion wallet, etc.)
5. **Développement frontend** basé sur les maquettes validées
