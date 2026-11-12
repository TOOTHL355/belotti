import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider, languageFromPath } from './context/LanguageContext.jsx';
import './fonts.js';
import './styles.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <LanguageProvider initialLanguage={languageFromPath(window.location.pathname)}>
      <App />
    </LanguageProvider>
  </StrictMode>
);

// Production pages are pre-rendered (scripts/prerender.mjs) → hydrate.
// The dev server serves an empty #root → render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
