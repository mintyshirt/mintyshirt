# Conception de l'API MintyShirt

Ce document décrit la conception de l'API RESTful pour la plateforme MintyShirt, en se basant sur l'architecture technique et les workflows utilisateurs définis.

## Principes Généraux

- **RESTful** : Utilisation des verbes HTTP (GET, POST, PUT, DELETE) et des codes de statut standards.
- **JSON** : Format de données pour les requêtes et les réponses.
- **Authentification** : Utilisation de JWT (JSON Web Tokens) pour les utilisateurs authentifiés.
- **Gestion des erreurs** : Réponses d'erreur structurées avec des codes spécifiques.
- **Pagination** : Utilisation de paramètres `limit` et `offset` (ou `page`) pour les collections.
- **Versioning** : Préfixe `/v1/` dans l'URL pour la gestion des versions.

## Endpoints Principaux

### 1. Authentification (`/v1/auth`)

- `POST /v1/auth/register` : Inscription d'un nouvel utilisateur (client ou créateur).
- `POST /v1/auth/login/email` : Connexion avec email et mot de passe.
- `POST /v1/auth/login/wallet` : Connexion avec signature de wallet.
- `POST /v1/auth/request-verification-code` : Demande d'un code de vérification par email.
- `POST /v1/auth/verify-email` : Vérification de l'email avec un code.
- `POST /v1/auth/refresh-token` : Rafraîchissement du token JWT.
- `POST /v1/auth/logout` : Déconnexion.
- `POST /v1/auth/kyc/initiate` : Initier le processus KYC pour l'achat de tokens en fiat.
- `GET /v1/auth/kyc/status` : Vérifier le statut du KYC.

### 2. Utilisateurs (`/v1/users`)

- `GET /v1/users/me` : Obtenir les informations de l'utilisateur connecté.
- `PUT /v1/users/me` : Mettre à jour les informations de l'utilisateur connecté.
- `GET /v1/users/me/wallet` : Obtenir les informations du wallet associé.
- `POST /v1/users/me/wallet/connect` : Connecter un wallet externe.
- `POST /v1/users/me/wallet/create` : Créer un wallet intégré (Account Abstraction).
- `GET /v1/users/me/orders` : Lister les commandes de l'utilisateur.
- `GET /v1/users/me/royalties` : Obtenir le résumé des royalties reçues.
- `GET /v1/users/me/affiliation` : Obtenir les informations d'affiliation (liens, commissions).
- `GET /v1/users/me/notifications` : Lister les notifications de l'utilisateur.
- `POST /v1/users/me/notifications/read` : Marquer les notifications comme lues.

### 3. Créateurs (`/v1/creators`)

- `GET /v1/creators` : Lister les créateurs publics (avec filtres et tri).
- `GET /v1/creators/{creatorId}` : Obtenir le profil public d'un créateur.
- `GET /v1/creators/me` : Obtenir le profil du créateur connecté.
- `PUT /v1/creators/me` : Mettre à jour le profil du créateur connecté.
- `GET /v1/creators/me/dashboard` : Obtenir les données du dashboard créateur.
- `GET /v1/creators/me/ips` : Lister les actifs IP du créateur.
- `GET /v1/creators/me/products` : Lister les produits du créateur.
- `GET /v1/creators/me/orders` : Lister les commandes reçues par le créateur.
- `GET /v1/creators/me/revenues` : Obtenir le résumé des revenus du créateur.
- `GET /v1/creators/me/affiliation` : Obtenir les statistiques d'affiliation.
- `POST /v1/creators/me/collaboration/propose` : Proposer une collaboration à un autre créateur.
- `GET /v1/creators/me/collaboration/requests` : Lister les demandes de collaboration reçues.
- `POST /v1/creators/me/collaboration/requests/{requestId}/respond` : Répondre à une demande de collaboration.
- `POST /v1/creators/me/packaging/configure` : Configurer les options d'emballage personnalisé.

### 4. Actifs IP (`/v1/ips`)

- `POST /v1/ips` : Créer un nouvel actif IP (nécessite authentification créateur).
- `GET /v1/ips` : Lister les actifs IP publics (DesignHub, avec filtres).
- `GET /v1/ips/{ipId}` : Obtenir les détails d'un actif IP.
- `PUT /v1/ips/{ipId}` : Mettre à jour les métadonnées d'un actif IP.
- `POST /v1/ips/{ipId}/version` : Ajouter une nouvelle version à un actif IP.
- `POST /v1/ips/{ipId}/tokens/configure` : Configurer les Royalty Tokens pour un IP.
- `GET /v1/ips/{ipId}/tokens` : Obtenir les détails des Royalty Tokens d'un IP.
- `POST /v1/ips/{ipId}/license/request` : Demander une licence pour un IP.
- `GET /v1/ips/{ipId}/license/requests` : Lister les demandes de licence reçues (pour le propriétaire).
- `POST /v1/ips/{ipId}/license/requests/{requestId}/respond` : Répondre à une demande de licence.
- `POST /v1/ips/{ipId}/fork/request` : Demander la création d'un fork (IP enfant).
- `GET /v1/ips/{ipId}/fork/requests` : Lister les demandes de fork reçues (pour le propriétaire).
- `POST /v1/ips/{ipId}/fork/requests/{requestId}/respond` : Répondre à une demande de fork.
- `POST /v1/ips/collaborative` : Créer un IP commun suite à une collaboration acceptée.

### 5. Produits (`/v1/products`)

- `GET /v1/products` : Lister les produits disponibles (avec filtres par catégorie, créateur, etc.).
- `GET /v1/products/{productId}` : Obtenir les détails d'un produit.
- `POST /v1/products` : Créer un nouveau produit (nécessite authentification créateur).
- `PUT /v1/products/{productId}` : Mettre à jour un produit.
- `DELETE /v1/products/{productId}` : Supprimer un produit.
- `GET /v1/products/catalog` : Obtenir le catalogue de base Gelato (pour les créateurs).

### 6. Commandes (`/v1/orders`)

- `POST /v1/orders` : Créer une nouvelle commande de merchandising.
- `GET /v1/orders/{orderId}` : Obtenir les détails d'une commande.
- `GET /v1/orders/{orderId}/status` : Obtenir le statut d'une commande.
- `GET /v1/orders/{orderId}/tracking` : Obtenir les informations de suivi d'une commande.
- `POST /v1/orders/tokens` : Acheter des Royalty Tokens.

### 7. Royalty Tokens (`/v1/tokens`)

- `GET /v1/tokens` : Lister les Royalty Tokens disponibles sur la plateforme.
- `GET /v1/tokens/{tokenAddress}` : Obtenir les détails d'un Royalty Token.
- `GET /v1/tokens/{tokenAddress}/holders` : Lister les détenteurs d'un token.
- `GET /v1/tokens/{tokenAddress}/stats` : Obtenir les statistiques d'un token (volume d'échange, etc.).
- `GET /v1/tokens/me` : Lister les tokens détenus par l'utilisateur connecté.
- `POST /v1/tokens/swap` : Échanger des tokens sur TokenSwap (marché secondaire).

### 8. Whitelisting (`/v1/whitelists`)

- `POST /v1/whitelists` : Créer une nouvelle vente privée (nécessite authentification créateur).
- `GET /v1/whitelists/{whitelistId}` : Obtenir les détails d'une vente privée.
- `PUT /v1/whitelists/{whitelistId}` : Mettre à jour une vente privée.
- `POST /v1/whitelists/{whitelistId}/register` : S'inscrire à une vente privée.
- `GET /v1/whitelists/{whitelistId}/eligibility` : Vérifier l'éligibilité d'un utilisateur pour une vente privée.
- `POST /v1/whitelists/{whitelistId}/integrations/zealy` : Configurer l'intégration Zealy.
- `POST /v1/whitelists/{whitelistId}/integrations/side` : Configurer l'intégration Side.xyz.
- `POST /v1/whitelists/{whitelistId}/integrations/galxe` : Configurer l'intégration Galxe.
- `POST /v1/whitelists/{whitelistId}/verify/tomo` : Vérifier un token externe avec Tomo.inc.
- `POST /v1/whitelists/{whitelistId}/verify/covalent` : Vérifier un token externe avec Covalent (snapshot).

### 9. Chat Privé (`/v1/chats`)

- `POST /v1/chats` : Configurer le chat privé pour un créateur.
- `GET /v1/chats/{chatId}` : Obtenir les informations d'un chat privé.
- `GET /v1/chats/{chatId}/access` : Vérifier l'accès au chat privé.
- `GET /v1/chats/{chatId}/messages` : Obtenir les messages d'un chat.
- `POST /v1/chats/{chatId}/messages` : Envoyer un message dans un chat.
- `GET /v1/chats/me` : Lister les chats auxquels l'utilisateur a accès.

### 10. Affiliation (`/v1/affiliation`)

- `GET /v1/affiliation/links` : Obtenir les liens d'affiliation de l'utilisateur connecté.
- `GET /v1/affiliation/stats` : Obtenir les statistiques d'affiliation (conversions, commissions).
- `GET /v1/affiliation/commissions` : Lister les commissions gagnées.

## Structure des Données (Exemples)

### Produit

```json
{
  "id": "prod_123",
  "creatorId": "creator_abc",
  "ipId": "ip_xyz",
  "gelatoId": "gelato_tshirt_premium",
  "name": "T-Shirt Logo Minty",
  "description": "T-shirt premium avec le logo Minty",
  "price": 29.99,
  "currency": "USD",
  "variants": [
    { "id": "var_s_black", "size": "S", "color": "Black" },
    { "id": "var_m_black", "size": "M", "color": "Black" }
  ],
  "thumbnailUrl": "https://.../thumbnail.jpg",
  "createdAt": "2025-05-26T16:00:00Z"
}
```

### Commande

```json
{
  "id": "order_789",
  "userId": "user_def",
  "creatorId": "creator_abc",
  "items": [
    { "productId": "prod_123", "variantId": "var_m_black", "quantity": 1, "price": 29.99 }
  ],
  "totalAmount": 34.99,
  "shippingCost": 5.00,
  "currency": "USD",
  "status": "PROCESSING",
  "shippingAddress": { ... },
  "gelatoOrderId": "gelato_order_456",
  "trackingNumber": "1Z999AA10123456784",
  "createdAt": "2025-05-26T16:10:00Z"
}
```

### Royalty Token

```json
{
  "address": "0x...",
  "ipId": "ip_xyz",
  "creatorId": "creator_abc",
  "name": "Minty Royalty Token",
  "symbol": "MRT",
  "totalSupply": 10000,
  "royaltyPercentage": 10,
  "marketCap": 5000.00,
  "volume24h": 250.00,
  "createdAt": "2025-05-26T16:05:00Z"
}
```

## Prochaines Étapes

1. **Détailler chaque endpoint** avec les paramètres de requête, les corps de requête/réponse et les codes de statut.
2. **Définir les schémas de données** précis pour chaque ressource.
3. **Spécifier les règles de validation** pour chaque endpoint.
4. **Documenter l'API** en utilisant un format standard comme OpenAPI (Swagger).
5. **Implémenter les endpoints** dans le backend.
6. **Tester l'API** avec des outils comme Postman ou des tests automatisés.
