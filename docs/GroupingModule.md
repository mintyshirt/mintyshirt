# Module GroupingModule

Ce module smart contract permet d'associer plusieurs designs à une même IP enregistrée dans `MintyShirtRegistry`.

## Principales Fonctions

- `addDesignToIP(ipId, designId)` : lie un design existant à l'IP dont l'auteur est l'appelant.
- `removeDesignFromIP(designId)` : supprime l'association d'un design.
- `getDesignsForIP(ipId)` : retourne la liste des designs liés à une IP.
- `getIPForDesign(designId)` : indique l'IP à laquelle un design est rattaché.

L'accès aux fonctions d'ajout et de suppression est réservé au créateur de l'IP ou au propriétaire du contrat.

## Exemple d'utilisation dans Hardhat

```javascript
const GroupingModule = await ethers.getContractFactory("GroupingModule");
const grouping = await GroupingModule.deploy(registry.address);
await grouping.deployed();

await grouping.connect(creator).addDesignToIP(ipId, designId);
const designs = await grouping.getDesignsForIP(ipId);
```
