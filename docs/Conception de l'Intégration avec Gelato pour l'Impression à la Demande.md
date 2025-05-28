# Conception de l'Intégration avec Gelato pour l'Impression à la Demande

Ce document détaille la conception de l'intégration entre MintyShirt et Gelato pour le service d'impression à la demande (Print-on-Demand).

## Vue d'ensemble de l'Intégration

### Architecture Globale

L'intégration avec Gelato permet à MintyShirt de transmettre automatiquement les commandes de merchandising, de suivre leur production et leur livraison, tout en masquant la marque Gelato pour offrir une expérience de marque cohérente.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Application MintyShirt                               │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    │
┌───────────────────────────────────▼───────────────────────────────────┐
│                     Gelato Integration Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐    │
│  │ Product Catalog │  │  Order Manager  │  │  Shipping Tracker   │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────────┘    │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    │
┌───────────────────────────────────▼───────────────────────────────────┐
│                        Gelato API (REST)                               │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    │
┌───────────────────────────────────▼───────────────────────────────────┐
│                   Gelato Production & Fulfillment                      │
└─────────────────────────────────────────────────────────────────────────┘
```

### Composants Principaux

#### 1. Product Catalog Service

**Objectif** : Synchroniser et gérer le catalogue de produits Gelato disponibles sur MintyShirt.

**Fonctionnalités** :
- Récupération et mise à jour du catalogue Gelato
- Gestion des catégories et filtres
- Stockage des informations de produits (tailles, couleurs, prix, etc.)
- Gestion des prix avec marge MintyShirt intégrée

#### 2. Order Manager Service

**Objectif** : Gérer le cycle de vie complet des commandes, de la création à la livraison.

**Fonctionnalités** :
- Création et soumission des commandes à Gelato
- Gestion des paiements et des remboursements
- Suivi de l'état des commandes
- Gestion des erreurs et exceptions

#### 3. Shipping Tracker Service

**Objectif** : Suivre et communiquer l'état de livraison des commandes.

**Fonctionnalités** :
- Suivi des colis en temps réel
- Notifications aux clients et créateurs
- Gestion des problèmes de livraison
- Historique des expéditions

## Détails de l'Implémentation

### 1. Product Catalog Service

```typescript
class ProductCatalogService {
  constructor(
    private gelatoApiClient: GelatoApiClient,
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
    private configService: ConfigService,
    private cacheService: CacheService
  ) {}
  
  // Synchroniser le catalogue complet
  async syncFullCatalog(): Promise<void> {
    try {
      // Récupérer tous les produits de Gelato
      const gelatoProducts = await this.gelatoApiClient.getProducts();
      
      // Traiter et stocker les produits
      for (const product of gelatoProducts) {
        await this.processAndStoreProduct(product);
      }
      
      // Mettre à jour la date de dernière synchronisation
      await this.configService.set('last_catalog_sync', new Date().toISOString());
      
      // Invalider les caches concernés
      await this.cacheService.invalidatePattern('products:*');
    } catch (error) {
      this.logger.error('Failed to sync Gelato catalog', error);
      throw new Error('Catalog synchronization failed');
    }
  }
  
  // Traiter et stocker un produit
  private async processAndStoreProduct(gelatoProduct: GelatoProduct): Promise<void> {
    // Calculer le prix avec la marge MintyShirt
    const basePrice = gelatoProduct.price;
    const margin = this.configService.get('product_margin_percentage');
    const finalPrice = basePrice * (1 + margin / 100);
    
    // Créer ou mettre à jour le produit dans notre base
    await this.productRepository.upsert({
      gelatoId: gelatoProduct.id,
      name: gelatoProduct.name,
      description: gelatoProduct.description,
      basePrice: basePrice,
      finalPrice: finalPrice,
      currency: gelatoProduct.currency,
      categories: gelatoProduct.categories,
      variants: gelatoProduct.variants,
      printAreas: gelatoProduct.printAreas,
      thumbnailUrl: gelatoProduct.thumbnailUrl,
      updatedAt: new Date()
    });
  }
  
  // Obtenir les produits par catégorie
  async getProductsByCategory(categoryId: string, options: ProductQueryOptions): Promise<PaginatedProducts> {
    const cacheKey = `products:category:${categoryId}:${JSON.stringify(options)}`;
    
    // Vérifier le cache
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Récupérer les produits de la base de données
    const products = await this.productRepository.findByCategory(categoryId, options);
    
    // Mettre en cache
    await this.cacheService.set(cacheKey, JSON.stringify(products), 3600); // 1 heure
    
    return products;
  }
  
  // Obtenir les détails d'un produit
  async getProductDetails(productId: string): Promise<ProductDetails> {
    const cacheKey = `products:details:${productId}`;
    
    // Vérifier le cache
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Récupérer le produit de la base de données
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }
    
    // Enrichir avec des informations supplémentaires
    const details: ProductDetails = {
      ...product,
      availableSizes: await this.getAvailableSizes(productId),
      availableColors: await this.getAvailableColors(productId),
      estimatedDeliveryTime: await this.getEstimatedDeliveryTime(productId),
      printAreaTemplates: await this.getPrintAreaTemplates(productId)
    };
    
    // Mettre en cache
    await this.cacheService.set(cacheKey, JSON.stringify(details), 3600); // 1 heure
    
    return details;
  }
  
  // Autres méthodes...
}
```

### 2. Order Manager Service

```typescript
class OrderManagerService {
  constructor(
    private gelatoApiClient: GelatoApiClient,
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private paymentService: PaymentService,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {}
  
  // Créer une commande
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    try {
      // Valider les produits et les quantités
      await this.validateOrderItems(orderData.items);
      
      // Calculer le montant total
      const totalAmount = await this.calculateOrderTotal(orderData.items);
      
      // Créer la commande dans notre système
      const order = await this.orderRepository.create({
        userId: orderData.userId,
        creatorId: orderData.creatorId,
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        totalAmount,
        status: 'PENDING',
        createdAt: new Date()
      });
      
      // Notifier le créateur
      await this.notificationService.notifyCreator(
        orderData.creatorId,
        'NEW_ORDER',
        { orderId: order.id, totalAmount }
      );
      
      return order;
    } catch (error) {
      this.logger.error('Failed to create order', error);
      throw new Error('Order creation failed');
    }
  }
  
  // Soumettre une commande à Gelato
  async submitOrderToGelato(orderId: string): Promise<void> {
    try {
      // Récupérer la commande
      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }
      
      // Vérifier que la commande est en attente
      if (order.status !== 'PENDING') {
        throw new Error(`Order ${orderId} is not in PENDING status`);
      }
      
      // Préparer les données pour Gelato
      const gelatoOrderData = await this.prepareGelatoOrderData(order);
      
      // Soumettre la commande à Gelato
      const gelatoResponse = await this.gelatoApiClient.createOrder(gelatoOrderData);
      
      // Mettre à jour la commande avec les informations Gelato
      await this.orderRepository.update(orderId, {
        gelatoOrderId: gelatoResponse.orderId,
        status: 'PROCESSING',
        updatedAt: new Date()
      });
      
      // Notifier le client
      await this.notificationService.notifyCustomer(
        order.userId,
        'ORDER_CONFIRMED',
        { orderId: order.id }
      );
    } catch (error) {
      this.logger.error(`Failed to submit order ${orderId} to Gelato`, error);
      
      // Mettre à jour le statut de la commande
      await this.orderRepository.update(orderId, {
        status: 'ERROR',
        errorMessage: error.message,
        updatedAt: new Date()
      });
      
      throw new Error('Order submission to Gelato failed');
    }
  }
  
  // Préparer les données pour Gelato
  private async prepareGelatoOrderData(order: Order): Promise<GelatoOrderData> {
    // Récupérer les informations des produits
    const orderItems = [];
    
    for (const item of order.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      orderItems.push({
        productId: product.gelatoId,
        quantity: item.quantity,
        printAreas: item.printAreas,
        variantId: item.variantId
      });
    }
    
    // Déterminer si l'emballage personnalisé est activé
    const useCustomPackaging = this.configService.get('use_custom_packaging');
    
    // Construire les données de commande Gelato
    return {
      orderItems,
      shippingAddress: order.shippingAddress,
      metadata: {
        mintyshirtOrderId: order.id,
        creatorId: order.creatorId
      },
      packagingOptions: useCustomPackaging ? {
        useCustomPackaging: true,
        packagingType: 'MINTYSHIRT_STANDARD'
      } : undefined
    };
  }
  
  // Vérifier l'état d'une commande
  async checkOrderStatus(orderId: string): Promise<OrderStatus> {
    try {
      // Récupérer la commande
      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }
      
      // Si la commande n'a pas encore été soumise à Gelato
      if (!order.gelatoOrderId) {
        return order.status;
      }
      
      // Récupérer l'état de la commande depuis Gelato
      const gelatoStatus = await this.gelatoApiClient.getOrderStatus(order.gelatoOrderId);
      
      // Mapper l'état Gelato à notre état
      const mappedStatus = this.mapGelatoStatus(gelatoStatus);
      
      // Si l'état a changé, mettre à jour notre commande
      if (mappedStatus !== order.status) {
        await this.orderRepository.update(orderId, {
          status: mappedStatus,
          updatedAt: new Date()
        });
        
        // Notifier le client et le créateur du changement d'état
        await this.notifyStatusChange(order, mappedStatus);
      }
      
      return mappedStatus;
    } catch (error) {
      this.logger.error(`Failed to check status for order ${orderId}`, error);
      throw new Error('Order status check failed');
    }
  }
  
  // Notifier du changement d'état
  private async notifyStatusChange(order: Order, newStatus: OrderStatus): Promise<void> {
    // Notifier le client
    await this.notificationService.notifyCustomer(
      order.userId,
      'ORDER_STATUS_CHANGED',
      { orderId: order.id, status: newStatus }
    );
    
    // Notifier le créateur
    await this.notificationService.notifyCreator(
      order.creatorId,
      'ORDER_STATUS_CHANGED',
      { orderId: order.id, status: newStatus }
    );
    
    // Si la commande est terminée, déclencher la distribution des revenus
    if (newStatus === 'DELIVERED') {
      await this.triggerRevenueDistribution(order);
    }
  }
  
  // Déclencher la distribution des revenus
  private async triggerRevenueDistribution(order: Order): Promise<void> {
    // Logique pour distribuer les revenus aux détenteurs de tokens
    // Cette méthode sera implémentée dans un service dédié
  }
  
  // Autres méthodes...
}
```

### 3. Shipping Tracker Service

```typescript
class ShippingTrackerService {
  constructor(
    private gelatoApiClient: GelatoApiClient,
    private orderRepository: OrderRepository,
    private shippingRepository: ShippingRepository,
    private notificationService: NotificationService
  ) {}
  
  // Récupérer les informations de suivi
  async getTrackingInfo(orderId: string): Promise<ShippingTracking> {
    try {
      // Récupérer la commande
      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }
      
      // Si la commande n'a pas encore été expédiée
      if (!order.trackingNumber) {
        return {
          orderId,
          status: 'NOT_SHIPPED',
          events: []
        };
      }
      
      // Récupérer les informations de suivi depuis Gelato
      const gelatoTracking = await this.gelatoApiClient.getTracking(order.gelatoOrderId);
      
      // Stocker les informations de suivi
      await this.shippingRepository.upsert({
        orderId,
        trackingNumber: gelatoTracking.trackingNumber,
        carrier: gelatoTracking.carrier,
        estimatedDelivery: gelatoTracking.estimatedDelivery,
        status: gelatoTracking.status,
        events: gelatoTracking.events,
        updatedAt: new Date()
      });
      
      // Transformer les données pour notre API
      return {
        orderId,
        trackingNumber: gelatoTracking.trackingNumber,
        carrier: gelatoTracking.carrier,
        estimatedDelivery: gelatoTracking.estimatedDelivery,
        status: this.mapGelatoTrackingStatus(gelatoTracking.status),
        events: gelatoTracking.events.map(event => ({
          date: event.date,
          location: event.location,
          description: event.description,
          status: this.mapGelatoEventStatus(event.status)
        })),
        trackingUrl: this.generateTrackingUrl(gelatoTracking.carrier, gelatoTracking.trackingNumber)
      };
    } catch (error) {
      this.logger.error(`Failed to get tracking info for order ${orderId}`, error);
      throw new Error('Tracking info retrieval failed');
    }
  }
  
  // Générer l'URL de suivi
  private generateTrackingUrl(carrier: string, trackingNumber: string): string {
    // Logique pour générer l'URL de suivi selon le transporteur
    switch (carrier.toLowerCase()) {
      case 'ups':
        return `https://www.ups.com/track?tracknum=${trackingNumber}`;
      case 'fedex':
        return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
      case 'dhl':
        return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`;
      default:
        return `https://mintyshirt.com/tracking/${trackingNumber}`;
    }
  }
  
  // Synchroniser les informations de suivi pour toutes les commandes actives
  async syncAllActiveTrackings(): Promise<void> {
    try {
      // Récupérer toutes les commandes en cours de livraison
      const activeOrders = await this.orderRepository.findByStatuses([
        'SHIPPED',
        'IN_TRANSIT',
        'OUT_FOR_DELIVERY'
      ]);
      
      // Mettre à jour le suivi pour chaque commande
      for (const order of activeOrders) {
        try {
          await this.getTrackingInfo(order.id);
        } catch (error) {
          this.logger.warn(`Failed to sync tracking for order ${order.id}`, error);
          // Continuer avec les autres commandes
        }
      }
    } catch (error) {
      this.logger.error('Failed to sync all active trackings', error);
      throw new Error('Tracking sync failed');
    }
  }
  
  // Notifier les clients des mises à jour de livraison
  async notifyTrackingUpdates(): Promise<void> {
    try {
      // Récupérer les mises à jour de suivi récentes
      const recentUpdates = await this.shippingRepository.findRecentUpdates(24); // dernières 24h
      
      // Notifier les clients pour chaque mise à jour
      for (const update of recentUpdates) {
        const order = await this.orderRepository.findById(update.orderId);
        if (!order) continue;
        
        // Notifier le client
        await this.notificationService.notifyCustomer(
          order.userId,
          'SHIPPING_UPDATE',
          {
            orderId: order.id,
            status: update.status,
            latestEvent: update.events[0]
          }
        );
      }
    } catch (error) {
      this.logger.error('Failed to notify tracking updates', error);
      throw new Error('Tracking notification failed');
    }
  }
  
  // Autres méthodes...
}
```

## Personnalisation de l'Emballage

### Options de Personnalisation

MintyShirt propose deux niveaux de personnalisation d'emballage avec Gelato :

1. **Personnalisation MintyShirt Standard** (Phase initiale)
   - Coût estimé : ~$1 par commande
   - Éléments personnalisés :
     - Étiquettes d'expédition avec logo MintyShirt
     - Carte de remerciement MintyShirt
     - Emballage neutre (sans marque Gelato)

2. **Personnalisation Créateur** (Phase ultérieure)
   - Coût estimé : ~$2-3 supplémentaires par commande
   - Éléments personnalisés :
     - Étiquettes d'expédition avec logo du créateur
     - Carte de remerciement personnalisée
     - Emballage aux couleurs du créateur
     - Autocollants ou goodies optionnels

### Implémentation

```typescript
class PackagingService {
  constructor(
    private gelatoApiClient: GelatoApiClient,
    private creatorRepository: CreatorRepository,
    private configService: ConfigService
  ) {}
  
  // Obtenir les options d'emballage pour une commande
  async getPackagingOptions(creatorId: string): Promise<PackagingOptions> {
    // Vérifier si la personnalisation MintyShirt est activée
    const useMintyShirtPackaging = this.configService.get('use_mintyshirt_packaging');
    
    if (!useMintyShirtPackaging) {
      return {
        type: 'STANDARD',
        customization: null
      };
    }
    
    // Récupérer les informations du créateur
    const creator = await this.creatorRepository.findById(creatorId);
    
    // Vérifier si le créateur a activé la personnalisation
    if (creator.useCustomPackaging) {
      return {
        type: 'CREATOR_CUSTOM',
        customization: {
          logoUrl: creator.packagingLogoUrl,
          primaryColor: creator.packagingPrimaryColor,
          secondaryColor: creator.packagingSecondaryColor,
          messageTemplate: creator.packagingMessageTemplate,
          includeStickers: creator.packagingIncludeStickers
        }
      };
    }
    
    // Sinon, utiliser la personnalisation MintyShirt standard
    return {
      type: 'MINTYSHIRT_STANDARD',
      customization: {
        logoUrl: this.configService.get('mintyshirt_logo_url'),
        primaryColor: this.configService.get('mintyshirt_primary_color'),
        secondaryColor: this.configService.get('mintyshirt_secondary_color'),
        messageTemplate: this.configService.get('mintyshirt_message_template'),
        includeStickers: false
      }
    };
  }
  
  // Configurer les options d'emballage pour un créateur
  async configureCreatorPackaging(
    creatorId: string,
    options: CreatorPackagingOptions
  ): Promise<void> {
    // Valider les options
    this.validatePackagingOptions(options);
    
    // Mettre à jour les options du créateur
    await this.creatorRepository.update(creatorId, {
      useCustomPackaging: true,
      packagingLogoUrl: options.logoUrl,
      packagingPrimaryColor: options.primaryColor,
      packagingSecondaryColor: options.secondaryColor,
      packagingMessageTemplate: options.messageTemplate,
      packagingIncludeStickers: options.includeStickers,
      updatedAt: new Date()
    });
    
    // Vérifier la compatibilité avec Gelato
    const validationResult = await this.gelatoApiClient.validatePackagingOptions({
      logoUrl: options.logoUrl,
      primaryColor: options.primaryColor,
      secondaryColor: options.secondaryColor
    });
    
    if (!validationResult.valid) {
      this.logger.warn(`Packaging options for creator ${creatorId} may have issues: ${validationResult.message}`);
    }
  }
  
  // Calculer le coût supplémentaire de l'emballage personnalisé
  calculatePackagingCost(packagingType: PackagingType): number {
    switch (packagingType) {
      case 'STANDARD':
        return 0;
      case 'MINTYSHIRT_STANDARD':
        return 1.0; // $1 par commande
      case 'CREATOR_CUSTOM':
        return 3.0; // $3 par commande
      default:
        return 0;
    }
  }
  
  // Autres méthodes...
}
```

## Gestion des Paiements et Revenus

### Flux de Paiement

1. **Client effectue un achat**
   - Paiement en monnaie fiat uniquement pour le merch (au lancement)
   - Montant total = Prix produits + Frais d'expédition + Personnalisation (optionnelle)

2. **Répartition des revenus**
   - Coût Gelato : Montant versé à Gelato pour la production et l'expédition
   - Commission MintyShirt : Marge intégrée au prix de fabrication
   - Revenu créateur : Montant restant après coûts et commission
   - Royalties : Pourcentage du revenu créateur distribué aux détenteurs de tokens

```typescript
class RevenueService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private creatorRepository: CreatorRepository,
    private tokenService: TokenService,
    private packagingService: PackagingService
  ) {}
  
  // Calculer la répartition des revenus pour une commande
  async calculateRevenueBreakdown(orderId: string): Promise<RevenueBreakdown> {
    // Récupérer la commande
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    
    // Récupérer les informations du créateur
    const creator = await this.creatorRepository.findById(order.creatorId);
    
    // Calculer les coûts Gelato
    let gelatoCost = 0;
    for (const item of order.items) {
      const product = await this.productRepository.findById(item.productId);
      gelatoCost += product.basePrice * item.quantity;
    }
    
    // Ajouter les frais d'expédition
    gelatoCost += order.shippingCost;
    
    // Ajouter les coûts d'emballage personnalisé
    const packagingOptions = await this.packagingService.getPackagingOptions(order.creatorId);
    const packagingCost = this.packagingService.calculatePackagingCost(packagingOptions.type);
    gelatoCost += packagingCost;
    
    // Calculer la commission MintyShirt
    const mintyshirtCommission = order.totalAmount - gelatoCost;
    
    // Calculer le revenu du créateur
    const creatorRevenue = mintyshirtCommission * (1 - this.configService.get('platform_fee_percentage') / 100);
    
    // Calculer les royalties
    const royaltyPercentage = await this.tokenService.getRoyaltyPercentage(creator.tokenAddress);
    const royaltyAmount = creatorRevenue * (royaltyPercentage / 100);
    
    // Calculer le revenu net du créateur
    const creatorNetRevenue = creatorRevenue - royaltyAmount;
    
    return {
      orderId,
      totalAmount: order.totalAmount,
      gelatoCost,
      packagingCost,
      mintyshirtCommission,
      creatorRevenue,
      royaltyPercentage,
      royaltyAmount,
      creatorNetRevenue
    };
  }
  
  // Distribuer les revenus pour une commande
  async distributeRevenue(orderId: string): Promise<void> {
    try {
      // Calculer la répartition des revenus
      const breakdown = await this.calculateRevenueBreakdown(orderId);
      
      // Récupérer la commande
      const order = await this.orderRepository.findById(orderId);
      
      // Récupérer les informations du créateur
      const creator = await this.creatorRepository.findById(order.creatorId);
      
      // Distribuer les royalties aux détenteurs de tokens
      if (breakdown.royaltyAmount > 0) {
        await this.tokenService.distributeRoyalties(
          creator.tokenAddress,
          breakdown.royaltyAmount
        );
      }
      
      // Mettre à jour le solde du créateur
      await this.creatorRepository.updateBalance(
        order.creatorId,
        breakdown.creatorNetRevenue
      );
      
      // Enregistrer la distribution
      await this.revenueRepository.create({
        orderId,
        creatorId: order.creatorId,
        totalAmount: breakdown.totalAmount,
        gelatoCost: breakdown.gelatoCost,
        mintyshirtCommission: breakdown.mintyshirtCommission,
        creatorRevenue: breakdown.creatorRevenue,
        royaltyAmount: breakdown.royaltyAmount,
        creatorNetRevenue: breakdown.creatorNetRevenue,
        distributedAt: new Date()
      });
    } catch (error) {
      this.logger.error(`Failed to distribute revenue for order ${orderId}`, error);
      throw new Error('Revenue distribution failed');
    }
  }
  
  // Autres méthodes...
}
```

## Gestion des Erreurs et Résilience

### Circuit Breaker pour l'API Gelato

```typescript
class GelatoApiClient {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private circuitBreakerService: CircuitBreakerService
  ) {
    // Initialiser le circuit breaker
    this.circuitBreakerService.register('gelato-api', {
      failureThreshold: 5,
      resetTimeout: 30000, // 30 secondes
      fallbackFunction: this.apiFallback.bind(this)
    });
  }
  
  // Appeler l'API Gelato avec circuit breaker
  private async callApi<T>(endpoint: string, method: string, data?: any): Promise<T> {
    return this.circuitBreakerService.execute('gelato-api', async () => {
      const url = `${this.configService.get('GELATO_API_URL')}${endpoint}`;
      const headers = {
        'Authorization': `Bearer ${this.configService.get('GELATO_API_KEY')}`,
        'Content-Type': 'application/json'
      };
      
      const response = await this.httpClient.request({
        url,
        method,
        headers,
        data
      });
      
      return response.data;
    });
  }
  
  // Fonction de fallback en cas d'erreur
  private async apiFallback<T>(endpoint: string, method: string, data?: any): Promise<T> {
    this.logger.warn(`Using fallback for Gelato API call: ${method} ${endpoint}`);
    
    // Logique de fallback selon l'endpoint
    if (endpoint.includes('/orders') && method === 'GET') {
      // Retourner le dernier état connu de la commande
      const orderId = endpoint.split('/').pop();
      return this.getLastKnownOrderStatus(orderId) as unknown as T;
    }
    
    // Pour les autres cas, lever une erreur
    throw new Error('Gelato API is currently unavailable');
  }
  
  // Autres méthodes...
}
```

### Gestion des Retries

```typescript
class OrderSyncService {
  constructor(
    private orderRepository: OrderRepository,
    private orderManagerService: OrderManagerService,
    private configService: ConfigService
  ) {}
  
  // Synchroniser les commandes avec Gelato
  async syncOrders(): Promise<void> {
    try {
      // Récupérer les commandes à synchroniser
      const pendingOrders = await this.orderRepository.findByStatus('PENDING');
      const processingOrders = await this.orderRepository.findByStatus('PROCESSING');
      
      // Synchroniser les commandes en attente
      for (const order of pendingOrders) {
        await this.syncPendingOrder(order);
      }
      
      // Synchroniser les commandes en cours
      for (const order of processingOrders) {
        await this.syncProcessingOrder(order);
      }
    } catch (error) {
      this.logger.error('Failed to sync orders', error);
      throw new Error('Order sync failed');
    }
  }
  
  // Synchroniser une commande en attente
  private async syncPendingOrder(order: Order): Promise<void> {
    try {
      // Vérifier si la commande est prête à être soumise
      if (this.isOrderReadyForSubmission(order)) {
        await this.orderManagerService.submitOrderToGelato(order.id);
      }
    } catch (error) {
      // Incrémenter le compteur de tentatives
      const retryCount = (order.retryCount || 0) + 1;
      const maxRetries = this.configService.get('max_order_submission_retries');
      
      if (retryCount >= maxRetries) {
        // Marquer la commande comme échouée
        await this.orderRepository.update(order.id, {
          status: 'FAILED',
          errorMessage: `Failed to submit after ${maxRetries} attempts: ${error.message}`,
          updatedAt: new Date()
        });
        
        // Notifier le client et le support
        await this.notifyOrderFailure(order);
      } else {
        // Mettre à jour le compteur de tentatives
        await this.orderRepository.update(order.id, {
          retryCount,
          lastRetryAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
  }
  
  // Autres méthodes...
}
```

## Monitoring et Alertes

```typescript
class GelatoMonitoringService {
  constructor(
    private gelatoApiClient: GelatoApiClient,
    private alertService: AlertService,
    private configService: ConfigService
  ) {}
  
  // Vérifier l'état du service Gelato
  async checkServiceHealth(): Promise<void> {
    try {
      const healthStatus = await this.gelatoApiClient.getServiceHealth();
      
      // Enregistrer l'état du service
      await this.serviceHealthRepository.create({
        service: 'GELATO',
        status: healthStatus.status,
        responseTime: healthStatus.responseTime,
        timestamp: new Date()
      });
      
      // Si le service n'est pas opérationnel, envoyer une alerte
      if (healthStatus.status !== 'OPERATIONAL') {
        await this.alertService.sendAlert({
          type: 'SERVICE_DEGRADATION',
          service: 'GELATO',
          status: healthStatus.status,
          message: healthStatus.message,
          timestamp: new Date()
        });
      }
    } catch (error) {
      this.logger.error('Failed to check Gelato service health', error);
      
      // Enregistrer l'échec
      await this.serviceHealthRepository.create({
        service: 'GELATO',
        status: 'ERROR',
        responseTime: 0,
        timestamp: new Date()
      });
      
      // Envoyer une alerte
      await this.alertService.sendAlert({
        type: 'SERVICE_UNAVAILABLE',
        service: 'GELATO',
        message: error.message,
        timestamp: new Date()
      });
    }
  }
  
  // Surveiller les délais de production
  async monitorProductionDelays(): Promise<void> {
    try {
      // Récupérer les commandes en production depuis plus de X jours
      const threshold = this.configService.get('production_delay_threshold_days');
      const delayedOrders = await this.orderRepository.findDelayedOrders(
        'PROCESSING',
        threshold
      );
      
      if (delayedOrders.length > 0) {
        // Envoyer une alerte
        await this.alertService.sendAlert({
          type: 'PRODUCTION_DELAY',
          count: delayedOrders.length,
          orders: delayedOrders.map(order => order.id),
          threshold,
          timestamp: new Date()
        });
        
        // Notifier les clients concernés
        for (const order of delayedOrders) {
          await this.notificationService.notifyCustomer(
            order.userId,
            'PRODUCTION_DELAY',
            {
              orderId: order.id,
              delay: threshold,
              estimatedCompletion: this.calculateNewEstimatedCompletion(order)
            }
          );
        }
      }
    } catch (error) {
      this.logger.error('Failed to monitor production delays', error);
    }
  }
  
  // Autres méthodes...
}
```

## Prochaines Étapes

1. **Développement de l'intégration avec l'API Gelato**
   - Configuration des clés API et environnements
   - Implémentation des services de base
   - Tests d'intégration

2. **Mise en place du système de gestion des commandes**
   - Développement du flux de commande complet
   - Intégration avec le système de paiement
   - Tests de bout en bout

3. **Implémentation de la personnalisation d'emballage**
   - Configuration de la personnalisation MintyShirt standard
   - Développement de l'interface de personnalisation pour les créateurs
   - Tests avec Gelato

4. **Développement du système de suivi des expéditions**
   - Intégration avec les API de suivi
   - Développement des notifications
   - Tests de suivi en conditions réelles

5. **Mise en place du monitoring et des alertes**
   - Configuration des seuils d'alerte
   - Développement des tableaux de bord de suivi
   - Tests de résilience
