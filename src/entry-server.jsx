import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';

export { translations, LANGUAGES } from './i18n/translations.js';
export { STORES, hoursSpec, telHref } from './stores.js';

export function render(lang) {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLanguage={lang}>
        <App />
      </LanguageProvider>
    </StrictMode>
  );
}
