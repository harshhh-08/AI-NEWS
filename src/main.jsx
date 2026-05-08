import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(10,15,30,0.95)',
            color: '#e2e8f0',
            border: '1px solid rgba(0,212,255,0.3)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#00ff94', secondary: '#020817' },
          },
          error: {
            iconTheme: { primary: '#ff006e', secondary: '#020817' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
