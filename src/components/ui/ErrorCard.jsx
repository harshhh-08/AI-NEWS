import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Reusable error display card with optional retry button.
 */
export default function ErrorCard({ message, onRetry, className = '' }) {
  return (
    <div className={`glass border border-red-500/20 p-6 flex flex-col items-center gap-4 text-center ${className}`}>
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
        <AlertTriangle className="text-red-400" size={24} />
      </div>
      <div>
        <p className="text-red-400 font-semibold text-sm">Something went wrong</p>
        <p className="text-slate-500 text-xs mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
}
