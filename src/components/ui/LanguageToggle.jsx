import { useLanguage } from '../../context/LanguageContext.jsx';
import { LANGUAGES } from '../../i18n/translations.js';

// Segmented IT | EN pill with a sliding thumb. With only two languages a
// toggle is one click and always shows both options, unlike a dropdown.
export default function LanguageToggle({ className = '' }) {
  const { language, setLanguage, t } = useLanguage();
  const index = Math.max(0, LANGUAGES.findIndex((l) => l.code === language));

  return (
    <div
      className={`lang-toggle ${className}`}
      role="radiogroup"
      aria-label={t('site.language')}
      style={{ '--idx': index, '--count': LANGUAGES.length }}
    >
      <span className="lang-thumb" aria-hidden="true" />
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          role="radio"
          aria-checked={language === l.code}
          lang={l.code}
          title={l.name}
          className={language === l.code ? 'is-active' : ''}
          onClick={() => setLanguage(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
