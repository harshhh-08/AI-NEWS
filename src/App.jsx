import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Contexts
import { ThemeProvider } from './context/ThemeContext';
import { ISSProvider }   from './context/ISSContext';
import { NewsProvider }  from './context/NewsContext';

// Layout
import Sidebar   from './components/ui/Sidebar';
import TopBar    from './components/ui/TopBar';
import BottomNav from './components/ui/BottomNav';
import Chatbot   from './components/chatbot/Chatbot';

// Pages
import OverviewPage from './pages/OverviewPage';
import ISSPage      from './pages/ISSPage';
import NewsPage     from './pages/NewsPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <ISSProvider>
        <NewsProvider>
          {/* Full-screen layout */}
          <div className="flex min-h-screen bg-animated dark:bg-animated">

            {/* Sidebar */}
            <Sidebar
              mobileOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
              {/* Top bar */}
              <TopBar onMenuOpen={() => setSidebarOpen(true)} />

              {/* Page content */}
              <main className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-6 overflow-x-hidden">
                <Routes>
                  <Route path="/"     element={<OverviewPage />} />
                  <Route path="/iss"  element={<ISSPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  {/* 404 fallback */}
                  <Route
                    path="*"
                    element={
                      <div className="glass rounded-2xl p-12 text-center">
                        <p className="text-4xl font-bold gradient-text mb-3">404</p>
                        <p className="text-slate-400">Page not found.</p>
                      </div>
                    }
                  />
                </Routes>
              </main>
            </div>

            {/* Mobile bottom nav */}
            <BottomNav />

            {/* Floating AI Chatbot */}
            <Chatbot />
          </div>
        </NewsProvider>
      </ISSProvider>
    </ThemeProvider>
  );
}
