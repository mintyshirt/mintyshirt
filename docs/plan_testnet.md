# Plan de déploiement et de test sur le testnet de Story Protocol

## Introduction

Ce document détaille notre stratégie de déploiement et de test sur le testnet de Story Protocol avant tout passage sur la blockchain principale. Cette étape est cruciale pour garantir la sécurité, l'économie et la fiabilité de notre plateforme MintyShirt.

## Environnement de test

- **Réseau** : Testnet de Story Protocol
- **Outils** : Hardhat, Ethers.js, Waffle pour les tests
- **Tokens de test** : Utilisation des faucets du testnet pour obtenir des tokens de test

## Smart Contracts à déployer

1. **MintyShirtRegistry**
2. **RoyaltyToken**
3. **LicenseManager**
4. **RevenueDistributor**
5. **TokenVerifier**

## Plan de test

### 1. Tests unitaires

- Tests de chaque fonction individuelle des smart contracts
- Vérification des cas limites et des conditions d'erreur
- Validation des émissions d'événements

### 2. Tests d'intégration

- Tests d'interaction entre les différents contrats
- Validation des flux complets (création d'IP, émission de tokens, distribution de revenus)
- Tests de régression après modifications

### 3. Scénarios utilisateurs

- Simulation complète des parcours utilisateurs
- Tests des cas d'utilisation principaux :
  - Enregistrement d'un créateur et de ses IP
  - Émission et distribution de Royalty Tokens
  - Demandes et approbations de licences
  - Création de forks (IP enfants)
  - Vérification de possession de tokens

### 4. Tests de sécurité

- Audit interne des smart contracts
- Tests de résistance aux attaques connues
- Vérification des contrôles d'accès et des autorisations

### 5. Tests de performance

- Évaluation de la consommation de gas
- Optimisation des fonctions coûteuses
- Tests de charge pour les opérations batchées

## Critères de validation

- Tous les tests unitaires et d'intégration passent à 100%
- Aucune vulnérabilité de sécurité critique ou majeure
- Consommation de gas optimisée pour les opérations fréquentes
- Comportement conforme aux spécifications dans tous les scénarios utilisateurs

## Passage au mainnet

Une fois tous les critères de validation remplis, nous préparerons un plan de déploiement sur la blockchain principale, incluant :

- Séquence précise de déploiement des contrats
- Vérification et publication du code source
- Configuration des paramètres initiaux
- Plan de migration des données si nécessaire

## Calendrier estimatif

- Déploiement sur testnet : 1 semaine
- Tests complets : 2-3 semaines
- Corrections et optimisations : 1-2 semaines
- Audit final et préparation au mainnet : 1 semaine
