# 🛸 Real-Time ISS & AI News Dashboard

A production-ready futuristic space-tech dashboard built with **React + Vite**, featuring live ISS tracking, global news, interactive charts, and an AI chatbot.

---

## ✨ Features

### 🛰️ ISS Live Tracker
- Fetches ISS position every **15 seconds** from open-notify API
- Speed calculated via **Haversine formula**
- Interactive **Leaflet map** with custom marker & trajectory trail
- Live speed **area chart** (Recharts)
- Astronaut roster grouped by spacecraft

### 📰 News Dashboard
- Latest 10 articles from **NewsData.io**
- Search, sort, and filter by category
- **15-minute localStorage cache**
- Category distribution **doughnut chart** — click slices to filter

### 🤖 AI Chatbot
- Powered by **Mistral-7B** via HuggingFace Router
- Only answers using live dashboard data (ISS + news)
- Typing indicator, auto-scroll, message persistence (30 messages)

### 🌙 Dark / Light Mode
- Tailwind `dark:` class strategy
- Saved in localStorage

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env
# Edit .env with your keys

# 3. Start development server
npm run dev
```

Open **http://localhost:3000**

---

## 🔑 Environment Variables

```env
VITE_NEWS_API_KEY=your_newsdata_io_key
VITE_HF_TOKEN=your_huggingface_token
```

Get API keys:
- **NewsData.io**: https://newsdata.io/register
- **HuggingFace**: https://huggingface.co/settings/tokens

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── iss/          # ISSMap, ISSStats, AstronautList
│   ├── news/         # NewsCard, NewsGrid
│   ├── charts/       # SpeedChart, NewsCategoryChart
│   ├── chatbot/      # Chatbot (floating AI assistant)
│   └── ui/           # Sidebar, TopBar, BottomNav, StatCard, Skeleton, ErrorCard, ThemeToggle
├── context/          # ThemeContext, ISSContext, NewsContext
├── pages/            # OverviewPage, ISSPage, NewsPage
├── services/         # issService, newsService, aiService
└── utils/            # haversine.js, storage.js
```

---

## 🛠️ Tech Stack

| Library | Purpose |
|---|---|
| React 18 + Vite | UI framework & bundler |
| Tailwind CSS | Styling & dark mode |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| React Leaflet | Interactive ISS map |
| Recharts | Speed & category charts |
| Lucide React | Icon library |
| React Hot Toast | Toast notifications |

---

## ☁️ Deployment (Vercel)

```bash
# Build for production
npm run build

# Deploy with Vercel CLI
npx vercel --prod
```

Set environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 📄 License

MIT © 2026
