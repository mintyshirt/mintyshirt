# Conception du Système de Vérification de Tokens

Ce document détaille la conception du système interne de vérification de tokens pour MintyShirt, ainsi que son intégration avec les solutions externes.

## Architecture du Système de Vérification

### Vue d'ensemble

Le système de vérification de tokens de MintyShirt utilise une architecture hybride :

1. **Système interne** pour les tokens liés à l'écosystème Story Protocol (groupes de chat, affiliation, réductions)
2. **Intégration avec Tomo.inc** pour la vérification en temps réel des tokens externes (uniquement pour le whitelisting)
3. **Intégration avec Covalent** pour les snapshots de tokens externes (uniquement pour le whitelisting)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Application MintyShirt                               │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
┌───────────────▼───────────┐ ┌─────▼─────────┐ ┌───────▼───────────────┐
│  Système Interne MintyShirt│ │  Tomo.inc    │ │       Covalent        │
│  (Tokens Story Protocol)   │ │ (Temps réel) │ │      (Snapshot)       │
└───────────────┬───────────┘ └─────┬─────────┘ └───────┬───────────────┘
                │                   │                   │
                │                   │                   │
┌───────────────▼───────────┐ ┌─────▼─────────┐ ┌───────▼───────────────┐
│    Story Protocol Chain    │ │ Blockchains  │ │     Blockchains       │
│                           │ │   Externes   │ │      Externes          │
└───────────────────────────┘ └───────────────┘ └───────────────────────┘
```

### Composants du Système Interne

#### 1. TokenVerificationService

**Objectif** : Service principal pour la vérification de la possession de tokens Story Protocol.

**Fonctionnalités** :
- Vérification en temps réel de la possession de tokens
- Gestion des seuils d'accès pour différentes fonctionnalités
- Cache des résultats pour optimiser les performances

```typescript
class TokenVerificationService {
  // Vérifier si un utilisateur a accès à une fonctionnalité spécifique
  async verifyAccess(
    userId: string,
    tokenAddress: string,
    feature: FeatureType
  ): Promise<boolean> {
    // Vérifier si le résultat est en cache
    const cachedResult = await this.checkCache(userId, tokenAddress, feature);
    if (cachedResult !== null) {
      return cachedResult;
    }

    // Obtenir le seuil requis pour la fonctionnalité
    const threshold = await this.getThreshold(tokenAddress, feature);
    
    // Vérifier le solde de tokens de l'utilisateur
    const balance = await this.getTokenBalance(userId, tokenAddress);
    
    // Déterminer si l'utilisateur a accès
    const hasAccess = balance >= threshold;
    
    // Mettre en cache le résultat
    await this.cacheResult(userId, tokenAddress, feature, hasAccess);
    
    return hasAccess;
  }
  
  // Autres méthodes...
}
```

#### 2. TokenBalanceMonitor

**Objectif** : Surveiller les changements de solde de tokens pour mettre à jour les accès.

**Fonctionnalités** :
- Écoute des événements de transfert de tokens
- Mise à jour des accès en cas de changement de solde
- Notification aux services concernés

```typescript
class TokenBalanceMonitor {
  constructor(
    private tokenVerificationService: TokenVerificationService,
    private eventEmitter: EventEmitter
  ) {}
  
  // Démarrer la surveillance
  async startMonitoring(): Promise<void> {
    // S'abonner aux événements de transfert de tokens
    this.subscribeToTransferEvents();
  }
  
  // Gérer un événement de transfert
  async handleTransferEvent(
    from: string,
    to: string,
    tokenAddress: string,
    amount: BigNumber
  ): Promise<void> {
    // Invalider le cache pour les utilisateurs concernés
    await this.tokenVerificationService.invalidateCache(from, tokenAddress);
    await this.tokenVerificationService.invalidateCache(to, tokenAddress);
    
    // Émettre un événement pour les services concernés
    this.eventEmitter.emit('token.balance.changed', {
      users: [from, to],
      tokenAddress,
      timestamp: Date.now()
    });
  }
  
  // Autres méthodes...
}
```

#### 3. AccessControlManager

**Objectif** : Gérer les règles d'accès pour les différentes fonctionnalités.

**Fonctionnalités** :
- Configuration des seuils d'accès par créateur et fonctionnalité
- Gestion des règles de transition (que faire quand un utilisateur perd l'accès)
- API pour les autres services

```typescript
class AccessControlManager {
  // Définir le seuil d'accès pour une fonctionnalité
  async setAccessThreshold(
    creatorId: string,
    tokenAddress: string,
    feature: FeatureType,
    threshold: number
  ): Promise<void> {
    // Valider les paramètres
    this.validateThreshold(threshold);
    
    // Enregistrer le seuil
    await this.accessThresholdRepository.save({
      creatorId,
      tokenAddress,
      feature,
      threshold,
      updatedAt: new Date()
    });
    
    // Notifier les services concernés
    this.eventEmitter.emit('access.threshold.changed', {
      creatorId,
      tokenAddress,
      feature,
      threshold,
      timestamp: Date.now()
    });
  }
  
  // Obtenir le seuil d'accès pour une fonctionnalité
  async getAccessThreshold(
    tokenAddress: string,
    feature: FeatureType
  ): Promise<number> {
    const threshold = await this.accessThresholdRepository.findOne({
      tokenAddress,
      feature
    });
    
    // Retourner le seuil ou la valeur par défaut (1)
    return threshold?.threshold || 1;
  }
  
  // Autres méthodes...
}
```

### Intégration avec Tomo.inc

**Objectif** : Vérifier en temps réel la possession de tokens externes pour le whitelisting.

**Fonctionnalités** :
- API pour vérifier la possession de tokens sur différentes blockchains
- Support pour les NFTs et tokens ERC-20
- Intégration avec le système de whitelisting

```typescript
class TomoIntegrationService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}
  
  // Vérifier la possession de tokens
  async verifyTokenOwnership(
    walletAddress: string,
    contractAddress: string,
    chainId: number,
    minAmount: number = 1
  ): Promise<boolean> {
    try {
      const apiKey = this.configService.get('TOMO_API_KEY');
      const endpoint = `${this.configService.get('TOMO_API_URL')}/verify`;
      
      const response = await this.httpClient.post(endpoint, {
        wallet_address: walletAddress,
        contract_address: contractAddress,
        chain_id: chainId,
        min_amount: minAmount,
        api_key: apiKey
      });
      
      return response.data.has_tokens === true;
    } catch (error) {
      this.logger.error('Error verifying token ownership with Tomo.inc', error);
      // Fallback à notre système interne si possible, sinon échouer
      return false;
    }
  }
  
  // Autres méthodes...
}
```

### Intégration avec Covalent

**Objectif** : Obtenir des snapshots de possession de tokens à un moment précis pour le whitelisting.

**Fonctionnalités** :
- API pour obtenir des snapshots de tokens sur différentes blockchains
- Stockage et indexation des snapshots
- Intégration avec le système de whitelisting

```typescript
class CovalentIntegrationService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private snapshotRepository: SnapshotRepository
  ) {}
  
  // Créer un snapshot
  async createSnapshot(
    contractAddress: string,
    chainId: number,
    blockHeight?: number
  ): Promise<string> {
    try {
      const apiKey = this.configService.get('COVALENT_API_KEY');
      const endpoint = `${this.configService.get('COVALENT_API_URL')}/v1/${chainId}/tokens/${contractAddress}/token_holders/`;
      
      const params = {
        key: apiKey,
        block-height: blockHeight || 'latest'
      };
      
      const response = await this.httpClient.get(endpoint, { params });
      
      // Générer un ID unique pour le snapshot
      const snapshotId = uuidv4();
      
      // Stocker le snapshot
      await this.snapshotRepository.save({
        id: snapshotId,
        contractAddress,
        chainId,
        blockHeight: response.data.data.items[0].block_height,
        timestamp: new Date(),
        data: response.data.data.items
      });
      
      return snapshotId;
    } catch (error) {
      this.logger.error('Error creating snapshot with Covalent', error);
      throw new Error('Failed to create snapshot');
    }
  }
  
  // Vérifier si une adresse est dans un snapshot
  async verifyAddressInSnapshot(
    snapshotId: string,
    walletAddress: string,
    minAmount: number = 1
  ): Promise<boolean> {
    try {
      const snapshot = await this.snapshotRepository.findOne(snapshotId);
      
      if (!snapshot) {
        throw new Error(`Snapshot ${snapshotId} not found`);
      }
      
      // Rechercher l'adresse dans le snapshot
      const holder = snapshot.data.find(
        item => item.address.toLowerCase() === walletAddress.toLowerCase()
      );
      
      if (!holder) {
        return false;
      }
      
      // Vérifier le solde
      const balance = new BigNumber(holder.balance);
      const minAmountWei = new BigNumber(minAmount).multipliedBy(1e18);
      
      return balance.isGreaterThanOrEqualTo(minAmountWei);
    } catch (error) {
      this.logger.error('Error verifying address in snapshot', error);
      return false;
    }
  }
  
  // Autres méthodes...
}
```

## Flux de Vérification

### 1. Vérification pour l'Accès au Groupe de Chat Privé

```
┌──────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│ Utilisateur  │     │ ChatAccessService │     │TokenVerificationSvc │
└──────┬───────┘     └─────────┬─────────┘     └──────────┬──────────┘
       │                       │                          │
       │ Demande accès         │                          │
       │───────────────────────>                          │
       │                       │                          │
       │                       │ verifyAccess(user, token, CHAT)
       │                       │─────────────────────────>
       │                       │                          │
       │                       │                          │ Vérifier cache
       │                       │                          │◄─────────────┐
       │                       │                          │              │
       │                       │                          │ Si pas en cache,
       │                       │                          │ vérifier on-chain
       │                       │                          │◄─────────────┐
       │                       │                          │              │
       │                       │ Résultat                 │              │
       │                       │<─────────────────────────│              │
       │                       │                          │              │
       │ Accès accordé/refusé  │                          │              │
       │<──────────────────────│                          │              │
       │                       │                          │              │
```

### 2. Vérification pour le Whitelisting avec Tokens Externes

```
┌──────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│ Utilisateur  │     │WhitelistingService│     │ TomoIntegrationSvc  │
└──────┬───────┘     └─────────┬─────────┘     └──────────┬──────────┘
       │                       │                          │
       │ Demande whitelisting  │                          │
       │───────────────────────>                          │
       │                       │                          │
       │                       │ verifyTokenOwnership(wallet, contract)
       │                       │─────────────────────────>
       │                       │                          │
       │                       │                          │ Appel API Tomo.inc
       │                       │                          │◄─────────────┐
       │                       │                          │              │
       │                       │ Résultat                 │              │
       │                       │<─────────────────────────│              │
       │                       │                          │              │
       │ Whitelisting accordé/refusé                      │              │
       │<──────────────────────│                          │              │
       │                       │                          │              │
```

### 3. Vérification pour le Whitelisting avec Snapshot

```
┌──────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│ Utilisateur  │     │WhitelistingService│     │CovalentIntegrationSvc│
└──────┬───────┘     └─────────┬─────────┘     └──────────┬──────────┘
       │                       │                          │
       │ Demande whitelisting  │                          │
       │───────────────────────>                          │
       │                       │                          │
       │                       │ verifyAddressInSnapshot(snapshotId, wallet)
       │                       │─────────────────────────>
       │                       │                          │
       │                       │                          │ Vérifier dans DB
       │                       │                          │◄─────────────┐
       │                       │                          │              │
       │                       │ Résultat                 │              │
       │                       │<─────────────────────────│              │
       │                       │                          │              │
       │ Whitelisting accordé/refusé                      │              │
       │<──────────────────────│                          │              │
       │                       │                          │              │
```

## Considérations de Performance

### Stratégie de Cache

Pour optimiser les performances, le système utilise une stratégie de cache à plusieurs niveaux :

1. **Cache en mémoire** pour les vérifications fréquentes (TTL court, ~1 minute)
2. **Cache Redis** pour les résultats plus persistants (TTL moyen, ~10 minutes)
3. **Invalidation sélective** lors des événements de transfert de tokens

```typescript
class TokenVerificationCache {
  constructor(
    private memoryCache: Cache,
    private redisCache: RedisClient
  ) {}
  
  // Générer une clé de cache
  private generateCacheKey(userId: string, tokenAddress: string, feature: string): string {
    return `token:verify:${userId}:${tokenAddress}:${feature}`;
  }
  
  // Obtenir un résultat du cache
  async get(userId: string, tokenAddress: string, feature: string): Promise<boolean | null> {
    const cacheKey = this.generateCacheKey(userId, tokenAddress, feature);
    
    // Vérifier d'abord le cache en mémoire
    const memResult = this.memoryCache.get(cacheKey);
    if (memResult !== undefined) {
      return memResult as boolean;
    }
    
    // Ensuite vérifier Redis
    try {
      const redisResult = await this.redisCache.get(cacheKey);
      if (redisResult !== null) {
        // Mettre aussi en cache mémoire
        this.memoryCache.set(cacheKey, redisResult === 'true', 60000); // 1 minute
        return redisResult === 'true';
      }
    } catch (error) {
      this.logger.warn('Redis cache error', error);
    }
    
    return null;
  }
  
  // Mettre en cache un résultat
  async set(userId: string, tokenAddress: string, feature: string, result: boolean): Promise<void> {
    const cacheKey = this.generateCacheKey(userId, tokenAddress, feature);
    
    // Mettre en cache mémoire
    this.memoryCache.set(cacheKey, result, 60000); // 1 minute
    
    // Mettre en cache Redis
    try {
      await this.redisCache.set(cacheKey, result.toString(), 'EX', 600); // 10 minutes
    } catch (error) {
      this.logger.warn('Redis cache error', error);
    }
  }
  
  // Invalider le cache pour un utilisateur et un token
  async invalidate(userId: string, tokenAddress: string): Promise<void> {
    const features = ['CHAT', 'AFFILIATE', 'DISCOUNT'];
    
    for (const feature of features) {
      const cacheKey = this.generateCacheKey(userId, tokenAddress, feature);
      
      // Supprimer du cache mémoire
      this.memoryCache.del(cacheKey);
      
      // Supprimer de Redis
      try {
        await this.redisCache.del(cacheKey);
      } catch (error) {
        this.logger.warn('Redis cache error', error);
      }
    }
  }
}
```

### Optimisation des Requêtes Blockchain

Pour réduire la charge sur la blockchain :

1. **Batch des requêtes** pour vérifier plusieurs utilisateurs en une seule transaction
2. **Multicall** pour combiner plusieurs appels de lecture en une seule requête
3. **Indexation des événements** pour suivre les transferts sans polling constant

```typescript
class BlockchainService {
  // Vérifier plusieurs soldes en une seule requête
  async batchGetTokenBalances(
    userIds: string[],
    tokenAddress: string
  ): Promise<Map<string, BigNumber>> {
    // Obtenir les adresses de wallet pour chaque utilisateur
    const walletAddresses = await this.getUserWalletAddresses(userIds);
    
    // Préparer l'appel multicall
    const multicallContract = this.getMulticallContract();
    const tokenContract = this.getTokenContract(tokenAddress);
    
    const calls = walletAddresses.map(address => ({
      target: tokenAddress,
      callData: tokenContract.interface.encodeFunctionData('balanceOf', [address])
    }));
    
    // Exécuter le multicall
    const { returnData } = await multicallContract.aggregate(calls);
    
    // Traiter les résultats
    const results = new Map<string, BigNumber>();
    
    for (let i = 0; i < userIds.length; i++) {
      const balance = tokenContract.interface.decodeFunctionResult(
        'balanceOf',
        returnData[i]
      )[0];
      
      results.set(userIds[i], balance);
    }
    
    return results;
  }
  
  // Autres méthodes...
}
```

## Sécurité et Fiabilité

### Mécanismes de Fallback

Pour assurer la fiabilité du système :

1. **Circuit Breaker** pour les intégrations externes (Tomo.inc, Covalent)
2. **Fallback au système interne** quand possible
3. **Mode dégradé** en cas de problème avec la blockchain

```typescript
class TokenVerificationService {
  // Vérifier l'accès avec circuit breaker et fallback
  async verifyAccessWithFallback(
    userId: string,
    tokenAddress: string,
    feature: FeatureType
  ): Promise<boolean> {
    try {
      // Vérifier si le circuit breaker est ouvert
      if (this.circuitBreakerService.isOpen('token-verification')) {
        return await this.fallbackVerification(userId, tokenAddress, feature);
      }
      
      // Tentative normale
      try {
        return await this.verifyAccess(userId, tokenAddress, feature);
      } catch (error) {
        // Incrémenter le compteur d'erreurs
        this.circuitBreakerService.recordFailure('token-verification');
        
        // Utiliser le fallback
        return await this.fallbackVerification(userId, tokenAddress, feature);
      }
    } catch (error) {
      this.logger.error('Critical error in token verification', error);
      
      // En dernier recours, politique permissive ou restrictive selon la configuration
      return this.configService.get('TOKEN_VERIFICATION_FALLBACK_POLICY') === 'PERMISSIVE';
    }
  }
  
  // Méthode de fallback
  private async fallbackVerification(
    userId: string,
    tokenAddress: string,
    feature: FeatureType
  ): Promise<boolean> {
    // Vérifier le cache d'abord
    const cachedResult = await this.checkCache(userId, tokenAddress, feature);
    if (cachedResult !== null) {
      return cachedResult;
    }
    
    // Vérifier la dernière vérification réussie en base de données
    const lastVerification = await this.verificationHistoryRepository.findLatestSuccessful(
      userId,
      tokenAddress,
      feature
    );
    
    if (lastVerification && Date.now() - lastVerification.timestamp.getTime() < 24 * 60 * 60 * 1000) {
      // Si la dernière vérification réussie date de moins de 24h, l'utiliser
      return lastVerification.result;
    }
    
    // Sinon, politique par défaut
    return this.configService.get('TOKEN_VERIFICATION_FALLBACK_POLICY') === 'PERMISSIVE';
  }
}
```

### Audit et Logging

Pour assurer la traçabilité et la sécurité :

1. **Logging détaillé** de toutes les vérifications
2. **Historique des accès** pour audit
3. **Alertes** en cas d'activité suspecte

```typescript
class VerificationAuditService {
  // Enregistrer une vérification
  async logVerification(
    userId: string,
    tokenAddress: string,
    feature: FeatureType,
    result: boolean,
    source: 'CACHE' | 'BLOCKCHAIN' | 'FALLBACK'
  ): Promise<void> {
    await this.verificationLogRepository.save({
      userId,
      tokenAddress,
      feature,
      result,
      source,
      timestamp: new Date(),
      ipAddress: this.requestContext.getIpAddress(),
      userAgent: this.requestContext.getUserAgent()
    });
    
    // Vérifier les patterns suspects
    await this.detectSuspiciousActivity(userId, tokenAddress, feature);
  }
  
  // Détecter une activité suspecte
  private async detectSuspiciousActivity(
    userId: string,
    tokenAddress: string,
    feature: FeatureType
  ): Promise<void> {
    // Compter les vérifications récentes
    const recentCount = await this.verificationLogRepository.countRecent(
      userId,
      tokenAddress,
      feature,
      5 * 60 * 1000 // 5 minutes
    );
    
    // Si trop de vérifications en peu de temps, alerter
    if (recentCount > 20) {
      this.alertService.sendAlert({
        type: 'SUSPICIOUS_VERIFICATION_ACTIVITY',
        userId,
        tokenAddress,
        feature,
        count: recentCount,
        timestamp: new Date()
      });
    }
  }
}
```

## Prochaines Étapes

1. **Implémentation du TokenVerificationService**
   - Développement du service de base
   - Intégration avec les smart contracts
   - Mise en place du système de cache

2. **Intégration avec Tomo.inc et Covalent**
   - Configuration des API keys
   - Développement des services d'intégration
   - Tests d'intégration

3. **Développement du système de monitoring**
   - Mise en place des listeners d'événements
   - Développement du système d'invalidation de cache
   - Configuration des alertes

4. **Tests de performance et de charge**
   - Simulation de charge élevée
   - Optimisation des points critiques
   - Tests de résilience
