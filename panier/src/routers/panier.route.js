const express = require('express');
const {
    ajouterProduit,
    supprimerProduit,
    getPanier,
    viderPanier,
    mettreAJourQuantite
} = require('../controllers/panier.controller');

const router = express.Router();

// Exemple de routes basées sur un controller panier

// Ajouter un article au panier
router.post('/add', ajouterProduit);

// Récupérer le panier de l'utilisateur
router.get('/getpanier', getPanier);

// Supprimer un article du panier
router.delete('/remove', supprimerProduit);

// Vider le panier
router.delete('/clear', viderPanier);

module.exports = router;