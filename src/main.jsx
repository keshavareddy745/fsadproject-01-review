import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'
import { AuthProvider } from './state/AuthContext.jsx'
import { PlatformProvider } from './state/PlatformContext.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlatformProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PlatformProvider>
    </BrowserRouter>
  </React.StrictMode>
)
