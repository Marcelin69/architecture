const { PrismaClient, Prisma } = require("../../generated/prisma");

const prisma = new PrismaClient();
const searchService = require("../services/search.service");

// Controller pour effectuer une recherche
exports.search = async (req, res) => {
  try {
    const { query } = req.body;

    // Exemple de fonction fetchFn à adapter selon ta logique métier
    const fetchFromDb = async (query) => {
      const normalizedQuery = query.trim().toLowerCase();
      const results = searchService.suggest(normalizedQuery);
      if (results.length > 0) {
        return results;
      }
      console.log(
        `Aucun résultat trouvé pour la requête : ${query}, normalisé : ${normalizedQuery}`
      );

      // Ici, tu peux ajouter la logique pour interroger ta base de données
      const dbResults = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { description: { contains: normalizedQuery } },
          ],
        },
      });
      console.log(`Résultats de la base de données pour la requête : ${query}`, dbResults);
      
      return dbResults.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
      }));
      // Si aucun résultat n'est trouvé, tu peux décider de retourner une liste vide ou de lancer une erreur
    };
    const results = await searchService.search(query, fetchFromDb);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
