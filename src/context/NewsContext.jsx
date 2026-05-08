import { createContext, useContext, useState, useCallback } from 'react';
import { fetchNews } from '../services/newsService';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';
import toast from 'react-hot-toast';

// ── Context ────────────────────────────────────────────
export const NewsContext = createContext(null);

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// ── Provider ───────────────────────────────────────────
export function NewsProvider({ children }) {
  const [articles, setArticles]             = useState([]);
  const [filtered, setFiltered]             = useState([]);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState(null);
  const [searchQuery, setSearchQuery]       = useState('');
  const [sortBy, setSortBy]                 = useState('latest');
  const [activeCategory, setActiveCategory] = useState(null);
  const [hasFetched, setHasFetched]         = useState(false);

  const applyFilters = useCallback((arts, query, sort, category) => {
    let result = [...arts];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) => a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q)
      );
    }
    if (category) {
      result = result.filter((a) => a.category === category);
    }
    if (sort === 'source') {
      result.sort((a, b) => (a.source || '').localeCompare(b.source || ''));
    }
    setFiltered(result);
  }, []);

  const loadNews = useCallback(async (query = '', forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = loadFromStorage(STORAGE_KEYS.NEWS_CACHE);
      if (cached) {
        setArticles(cached);
        applyFilters(cached, query, sortBy, activeCategory);
        setHasFetched(true);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const arts = await fetchNews(query);
      setArticles(arts);
      applyFilters(arts, query, sortBy, activeCategory);
      saveToStorage(STORAGE_KEYS.NEWS_CACHE, arts, CACHE_TTL);
      setHasFetched(true);
      toast.success(`${arts.length} articles loaded`);
    } catch (err) {
      console.error('News fetch error:', err);
      setError(err.message || 'Failed to fetch news');
      toast.error('News fetch failed. Check API key in .env');
    } finally {
      setLoading(false);
    }
  }, [sortBy, activeCategory, applyFilters]);

  const search = useCallback((q) => {
    setSearchQuery(q);
    applyFilters(articles, q, sortBy, activeCategory);
  }, [articles, sortBy, activeCategory, applyFilters]);

  const changeSort = useCallback((s) => {
    setSortBy(s);
    applyFilters(articles, searchQuery, s, activeCategory);
  }, [articles, searchQuery, activeCategory, applyFilters]);

  const filterByCategory = useCallback((cat) => {
    const next = activeCategory === cat ? null : cat;
    setActiveCategory(next);
    applyFilters(articles, searchQuery, sortBy, next);
  }, [articles, searchQuery, sortBy, activeCategory, applyFilters]);

  const categoryCounts = articles.reduce((acc, a) => {
    const cat = a.category || 'general';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <NewsContext.Provider value={{
      articles, filtered, loading, error,
      searchQuery, sortBy, activeCategory,
      hasFetched, categoryCounts,
      loadNews, search, changeSort, filterByCategory,
    }}>
      {children}
    </NewsContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────
export function useNews() {
  return useContext(NewsContext);
}
