const express = require('express');
const panierRoutes = require('./src/routers/panier.route');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Serveur panier en ligne');
});


// Routes pour le panier
app.use('/api/panier', panierRoutes);

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});