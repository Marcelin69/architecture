const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

class PanierService {
  // Ajoute un produit au panier d'un utilisateur
  static async ajouterProduit(productId, quantite = 1) {
    
    const produit = await prisma.product.findFirst({
      where: { id: productId },
    });
    
    if (!produit) {
      throw new Error("Produit non trouvé");
    }
    // Vérifie si le produit est déjà dans le panier
    const existant = await prisma.panier.findFirst({
      where: {
        productId: productId,
      },
    });

    if (existant) {
      // Incrémente la quantité
      return prisma.panier.update({
        where: { id: existant.id },
        data: { quantite: existant.quantite + quantite },
      });
    } else {
      // Ajoute le produit au panier
      return prisma.panier.create({
        data: {
          productId: productId,
          quantite: quantite,
        },
      });
    }
  }

  // Retire un produit du panier d'un utilisateur
  static async retirerProduit(productId, quantite = 1) {
    const existant = await prisma.panier.findFirst({
      where: { productId: productId },
    });

    if (!existant) return null;

    if (existant.quantite > quantite) {
      // Diminue la quantité
      return prisma.panierProduit.update({
        where: { id: existant.id },
        data: { quantite: existant.quantite - quantite },
      });
    } else {
      // Retire complètement le produit du panier
      return prisma.panierProduit.delete({
        where: { id: existant.id },
      });
    }
  }
  // Récupère le panier d'un utilisateur
  static async getPanier(userId) {
    const panier = await prisma.panier.findMany({
      where: { userId },
      include: {
        product: true, // Inclut les détails du produit
      },
    });
    if (!panier || panier.length === 0) {
      return { message: "Le panier est vide." };
    }
    return panier.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantite: item.quantite,
      produit: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
      },
    }));
  }
  // Vide le panier d'un utilisateur
  static async viderPanier(userId) {
    return prisma.panier.deleteMany({
      where: { userId },
    });
  }
  // supprimer un produit du panier
  static async supprimerProduit(productId, userId) {
    const existant = await prisma.panier.findFirst({
      where: { productId: productId, userId },
    });

    if (!existant) return null;

    return prisma.panier.delete({
      where: { id: existant.id },
    });
  }
}

module.exports = PanierService;
