import { useNews } from '../../context/NewsContext';
import NewsCard from './NewsCard';
import { SkeletonNewsCard } from '../ui/Skeleton';
import ErrorCard from '../ui/ErrorCard';
import { Search, RefreshCw, ArrowUpDown, X } from 'lucide-react';
import { useEffect } from 'react';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'source', label: 'By Source' },
];

export default function NewsGrid() {
  const {
    filtered, articles, loading, error, hasFetched,
    searchQuery, sortBy,
    loadNews, search, changeSort,
  } = useNews();

  // Load news on mount
  useEffect(() => {
    if (!hasFetched) loadNews();
  }, [hasFetched, loadNews]);

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="news-search"
            type="text"
            placeholder="Search articles…"
            value={searchQuery}
            onChange={(e) => search(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-xl glass border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-blue/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => search('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              id={`sort-${opt.value}`}
              onClick={() => changeSort(opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                sortBy === opt.value
                  ? 'bg-neon-blue/10 border border-neon-blue/40 text-neon-blue'
                  : 'glass border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}

          {/* Refresh */}
          <button
            id="news-refresh"
            onClick={() => loadNews('', true)}
            disabled={loading}
            className="btn-ghost flex items-center gap-2"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Status bar */}
      {!loading && !error && (
        <p className="text-xs text-slate-500">
          Showing <span className="text-slate-300">{filtered.length}</span> of{' '}
          <span className="text-slate-300">{articles.length}</span> articles
          {searchQuery && (
            <> for "<span className="text-neon-blue">{searchQuery}</span>"</>
          )}
        </p>
      )}

      {/* Error */}
      {error && !loading && (
        <ErrorCard message={error} onRetry={() => loadNews('', true)} />
      )}

      {/* Skeleton loaders */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <SkeletonNewsCard key={i} />)}
        </div>
      )}

      {/* Cards */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="glass py-16 rounded-2xl text-center">
              <p className="text-slate-400">No articles found.</p>
              {searchQuery && (
                <button className="btn-ghost mt-3" onClick={() => search('')}>
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
