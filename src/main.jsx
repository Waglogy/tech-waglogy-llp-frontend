import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import App from './App.jsx'

const rootEl = document.getElementById('root')
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// hydrateRoot when this pre-rendered file matches the current route;
// createRoot otherwise (SPA fallback served for a different route).
const ssrRoute = document.documentElement.dataset.ssrRoute
const routeMatches = ssrRoute !== undefined && (
  ssrRoute === window.location.pathname ||
  (ssrRoute === '/' && window.location.pathname === '/')
)

if (rootEl.children.length > 0 && routeMatches) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
