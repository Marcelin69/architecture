const { createClient } = require("redis");

class SearchService {
  constructor() {
    this.cache = new Map();
    const redisHost = process.env.REDIS_HOST || "localhost";
    this.redisClient = createClient({
      socket: {
        host: redisHost,
        port: 6379,
      },
    });
    this.QUERY_SET_KEY = "search:queries"; // Clé Redis du Set d’index

    this.redisClient.connect().catch(console.error);
  }

  normalizeQuery(query) {
    return query.trim().toLowerCase();
  }

  search = async (query, fetchFn) => {
    const normalizedQuery = this.normalizeQuery(query);

    // 1. Cache local
    if (this.cache.has(normalizedQuery)) {
      return this.cache.get(normalizedQuery);
    }

    // 2. Cache Redis
    const cachedRedis = await this.redisClient.get(normalizedQuery);
    if (cachedRedis) {
      const parsed = JSON.parse(cachedRedis);
      this.cache.set(normalizedQuery, parsed);
      return parsed;
    }

    // 3. Appel réel et mise en cache
    const results = await fetchFn(normalizedQuery);

    this.cache.set(normalizedQuery, results);
    await this.redisClient.set(normalizedQuery, JSON.stringify(results), {
      EX: 3600, // TTL 1h
    });

    // 4. Indexer la requête pour suggestion
    await this.redisClient.sAdd(this.QUERY_SET_KEY, normalizedQuery);

    return results;
  };

  suggest = async (query) => {
    const normalizedQuery = this.normalizeQuery(query);

    // Récupérer toutes les requêtes indexées
    const allQueries = await this.redisClient.sMembers(this.QUERY_SET_KEY);

    return allQueries.filter(
      (cachedQuery) =>
        cachedQuery.includes(normalizedQuery) && cachedQuery !== normalizedQuery
    );
  };

  clearCache = async () => {
    this.cache.clear();
    await this.redisClient.flushDb(); // ⚠️ vide toute la DB Redis utilisée
  };
}

module.exports = new SearchService();
