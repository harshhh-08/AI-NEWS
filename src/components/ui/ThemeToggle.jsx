import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title="Toggle dark/light mode"
      className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:border-neon-blue/40 transition-all duration-300 hover:shadow-neon-blue"
    >
      {isDark
        ? <Sun size={16} className="text-yellow-400" />
        : <Moon size={16} className="text-slate-400" />
      }
    </button>
  );
}
