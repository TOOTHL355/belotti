import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations, LANGUAGES } from '../i18n/translations.js';

// The URL is the source of truth: "/" is Italian, "/en/" is English. Each
// is pre-rendered to its own HTML file (scripts/prerender.mjs), so search
// engines index both and the server and client always agree on the language.
export function languageFromPath(pathname = '/') {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it';
}

function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && typeof acc === 'object' && key in acc ? acc[key] : undefined), obj);
}

function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

const LanguageContext = createContext(null);

export function LanguageProvider({ initialLanguage = 'it', children }) {
  const [language, setLanguageState] = useState(initialLanguage);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    const target = LANGUAGES.find((l) => l.code === lang)?.path ?? '/';
    if (window.location.pathname !== target) {
      window.history.pushState({ lang }, '', target + window.location.search + window.location.hash);
    }
  }, []);

  // Back/forward between "/" and "/en/".
  useEffect(() => {
    const onPop = () => setLanguageState(languageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Keep <html lang>, <title> and meta description in step after a toggle.
  useEffect(() => {
    const dict = translations[language];
    document.documentElement.lang = language;
    document.title = dict.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.meta.description);
  }, [language]);

  const value = useMemo(() => {
    const dict = translations[language];
    // t(): strings with {var} interpolation; falls back to the key path.
    const t = (key, vars) => {
      const v = resolve(dict, key);
      return typeof v === 'string' ? interpolate(v, vars) : key;
    };
    // raw(): non-string values such as day-name arrays.
    const raw = (key) => resolve(dict, key);
    return { language, setLanguage, t, raw };
  }, [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
