const { PrismaClient, Prisma } = require("../../generated/prisma");

const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");
class ProductService {
  // Ajouter un produit
  async addProduct(product) {
    const { name, description, price } = product;
    if ((!name, !description, !price)) {
      const error = new Error("Tous les champs sont obligatoires");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
      },
    });
    return newProduct;
  }

  // Récupérer tous les produits
  async getAllProducts() {
    const products = await prisma.product.findMany();
    if (products.length <= 0) {
      const error = new Error("Pas de products");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return products;
  }
  async getProductByOrder(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;

    // Récupérer tous les produits
    const allProducts = await prisma.product.findMany({
    skip: offset,
    take: limit,
    });


    return allProducts;
  }
  // Récupérer un produit par ID
  async getProductById(productId) {
    const id = parseInt(productId);
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });
    if (!product) {
      const error = new Error("Pas de products");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return product;
  }

  // Modifier un produit
  async updateProduct(productId, updatedProduct) {
    const id = parseInt(productId);
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });
    if (!product) {
      const error = new Error("Product n'esiste pas");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    const productupdate = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: updatedProduct.name,
        description: updatedProduct.description,
        pricd: updatedProduct.pricd,
      },
    });
    if (!productupdate) {
      const error = new Error("Erreur de misa ajout");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return productupdate;
  }

  // Supprimer un produit
  async deleteProduct(productId) {
    const id = parseInt(productId);
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });
    if (!product) {
      const error = new Error("Product n'esiste pas");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const deleteProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    if (!deleteProduct) {
      const error = new Error("Erreur de misa ajout");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    return deleteProduct;
  }
}

module.exports = new ProductService();
