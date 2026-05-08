/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          900: '#020817',
          800: '#0a0f1e',
          700: '#0d1530',
          600: '#111b3a',
          500: '#1a2550',
        },
        neon: {
          blue:   '#00d4ff',
          purple: '#a855f7',
          green:  '#00ff94',
          pink:   '#ff006e',
          orange: '#ff6b35',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          border:  'rgba(255,255,255,0.1)',
          hover:   'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'space-gradient':  'linear-gradient(135deg, #020817 0%, #0a0f1e 50%, #0d1530 100%)',
        'neon-gradient':   'linear-gradient(135deg, #00d4ff, #a855f7)',
        'card-gradient':   'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':     'spin 8s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'glow':          'glow 2s ease-in-out infinite',
        'slide-up':      'slideUp 0.3s ease-out',
        'slide-in':      'slideIn 0.3s ease-out',
        'fade-in':       'fadeIn 0.3s ease-out',
        'gradient-x':    'gradient-x 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff' },
          '50%':     { boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-blue':   '0 0 20px rgba(0,212,255,0.3)',
        'neon-purple': '0 0 20px rgba(168,85,247,0.3)',
        'neon-green':  '0 0 20px rgba(0,255,148,0.3)',
        'glass':       '0 8px 32px rgba(0,0,0,0.3)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
