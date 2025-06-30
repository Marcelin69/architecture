class SearchService {
  constructor() {
    this.cache = new Map();
  }
  search = async (query, fetchFn) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (this.cache.has(normalizedQuery)) {
      return this.cache.get(normalizedQuery);
    }
    const results = await fetchFn(normalizedQuery);
    this.cache.set(normalizedQuery, results);
    return results;
  };
  suggest = (query) => {
    const normalizedQuery = query.trim().toLowerCase();
    return Array.from(this.cache.keys()).filter(
      (cachedQuery) =>
        cachedQuery.includes(normalizedQuery) && cachedQuery !== normalizedQuery
    );
  };
  clearCache = () => {
    this.cache.clear();
  };
}

module.exports = new SearchService();
