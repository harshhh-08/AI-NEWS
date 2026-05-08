import { ExternalLink, Calendar, User, Globe } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80';

export default function NewsCard({ article }) {
  const {
    title, description, image, source,
    author, publishedAt, url, category,
  } = article;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Unknown date';

  return (
    <article className="glass glass-hover rounded-2xl overflow-hidden flex flex-col border border-white/5 animate-fade-in">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-space-700">
        <img
          src={image || FALLBACK_IMAGE}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          loading="lazy"
        />
        {/* Category badge */}
        {category && (
          <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-neon-blue capitalize">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2 hover:text-neon-blue transition-colors">
          {title}
        </h2>

        {description && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{description}</p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-auto pt-2 border-t border-white/5">
          {source && (
            <span className="flex items-center gap-1">
              <Globe size={11} />
              {source}
            </span>
          )}
          {author && author !== 'Unknown' && (
            <span className="flex items-center gap-1 truncate max-w-[120px]">
              <User size={11} />
              {author}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Calendar size={11} />
            {date}
          </span>
        </div>

        {/* Read more */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          id={`news-read-${article.id}`}
          className="btn-primary flex items-center justify-center gap-2 text-center mt-1"
        >
          Read More
          <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}
