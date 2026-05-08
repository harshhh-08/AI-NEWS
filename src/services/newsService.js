import axios from 'axios';

// Routed through Vite proxy → /proxy/news → https://newsdata.io/api/1/latest
const BASE_URL = '/proxy/news';
const API_KEY  = import.meta.env.VITE_NEWS_API_KEY;

/**
 * Fetch latest news articles.
 * @param {string} query - optional search query
 * @returns {Array} normalised article objects
 */
export async function fetchNews(query = '') {
  const params = {
    apikey:   API_KEY,
    language: 'en',
    size:     10,
  };
  if (query) params.q = query;

  const { data } = await axios.get(BASE_URL, { params, timeout: 15000 });

  if (data.status !== 'success') {
    throw new Error(data.message || 'News API returned an error');
  }

  // Normalise — free-tier fields only (no sentiment / ai_tag / content)
  return (data.results || []).map((a) => ({
    id:          a.article_id || Math.random().toString(36),
    title:       a.title       || 'Untitled',
    description: a.description || '',
    url:         a.link        || '#',
    image:       a.image_url   || null,
    source:      a.source_name || a.source_id || 'Unknown',
    author:      Array.isArray(a.creator) ? a.creator.join(', ') : (a.creator || 'Unknown'),
    publishedAt: a.pubDate     || new Date().toISOString(),
    category:    Array.isArray(a.category) ? a.category[0] : (a.category || 'general'),
    country:     Array.isArray(a.country)  ? a.country[0]  : (a.country  || 'unknown'),
    duplicate:   a.duplicate   || false,
  }));
}
