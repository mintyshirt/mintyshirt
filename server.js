const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, 'dist')));

// Return 404 for API routes so SPA HTML isn't served for missing endpoints
app.use('/api', (_, res) => res.status(404).end());

// Toutes les requêtes non traitées par les routes précédentes seront redirigées vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur MintyShirt démarré sur le port ${PORT}`);
});
