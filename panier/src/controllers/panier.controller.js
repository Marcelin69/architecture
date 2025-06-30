const panierService = require("../services/panier.service");

// Ajouter un produit au panier
exports.ajouterProduit = async (req, res) => {
  try {
    const { productId, quantite } = req.body;
    if (!productId || !quantite) {
      return res
        .status(400)
        .json({ message: "Produit ID et quantité sont requis." });
    }
    // Vérifie si la quantité est un nombre positif
    if (quantite <= 0 || isNaN(quantite)) {
      return res.status(400).json({ message: "Quantité invalide." });
    }
    
    const panier = await panierService.ajouterProduit(productId, quantite);
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un produit du panier
exports.supprimerProduit = async (req, res) => {
  try {
    const { productId } = req.params;
    const panier = await panierService.supprimerProduit(productId);
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer le panier de l'utilisateur
exports.getPanier = async (req, res) => {
  try {
    const panier = await panierService.getPanier();
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vider le panier
exports.viderPanier = async (req, res) => {
  try {
    await panierService.viderPanier();
    res.status(200).json({ message: "Panier vidé avec succès." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Mettre à jour la quantité d'un produit dans le panier
exports.mettreAJourQuantite = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantite } = req.body;
    const panier = await panierService.ajouterProduit(productId, quantite);
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
