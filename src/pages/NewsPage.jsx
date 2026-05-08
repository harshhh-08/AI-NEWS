import NewsGrid from '../components/news/NewsGrid';
import NewsCategoryChart from '../components/charts/NewsCategoryChart';
import { Newspaper } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-neon-purple/10 flex items-center justify-center">
            <Newspaper size={17} className="text-neon-purple" />
          </div>
          <h1 className="text-xl font-bold text-white">News Feed</h1>
        </div>
        <p className="text-sm text-slate-500 ml-11">
          Latest global news — cached 15 min · Click a chart slice to filter by category.
        </p>
      </div>

      {/* Category chart */}
      <div className="max-w-sm">
        <NewsCategoryChart />
      </div>

      {/* Articles */}
      <NewsGrid />
    </div>
  );
}
