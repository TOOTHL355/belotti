import { useState } from 'react';
import Logo from './Logo.jsx';
import { SOCIALS, FOOTER_LINKS, LEGAL } from '../data.js';
import { Social, Arrow, Check } from './Icons.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export function Socials() {
  const { t } = useLanguage();
  return (
    <section className="socials reveal">
      <div className="container socials-inner">
        <h2 className="display socials-title">{t('social.title')}</h2>
        <ul className="social-list">
          {SOCIALS.map((s) => {
            const Icon = Social[s.name];
            return (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} className={`social social-${s.name.toLowerCase()}`}>
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Newsletter() {
  const { t } = useLanguage();
  const [state, setState] = useState('idle');
  const onSubmit = (e) => {
    e.preventDefault();
    setState('done');
  };
  return (
    <section className="newsletter reveal">
      <div className="container">
        <div className="nl-card">
          <div className="nl-glow" aria-hidden="true" />
          <div className="nl-copy">
            <h2 className="display">{t('newsletter.title')}</h2>
            <p>{t('newsletter.body')}</p>
          </div>
          {state === 'done' ? (
            <div className="nl-done" role="status">
              <Check /> {t('newsletter.thanks')}
            </div>
          ) : (
            <form className="nl-form" onSubmit={onSubmit}>
              <label className="field">
                <input name="name" placeholder=" " required autoComplete="given-name" />
                <span>{t('newsletter.name')}</span>
              </label>
              <label className="field">
                <input name="email" type="email" placeholder=" " required autoComplete="email" />
                <span>{t('newsletter.email')}</span>
              </label>
              <button className="btn btn-amber" type="submit">
                {t('newsletter.submit')} <Arrow width={18} height={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo variant="light" className="footer-logo" />
            <address>
              <strong>Ottica Belotti SA</strong>
              <br />Via Retica 2, 6532 Castione-Arbedo
              <br />CHE-107.453.165
            </address>
          </div>
          <ul className="footer-links">
            {FOOTER_LINKS.map((l) => (
              <li key={l.key}><a href={l.href}>{t(l.key)}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-bottom">
          <ul className="legal">
            {LEGAL.map((l) => (
              <li key={l.key}><a href={l.href} target={l.href.includes('iubenda') ? '_blank' : undefined} rel="noreferrer">{t(l.key)}</a></li>
            ))}
          </ul>
          <p>{t('footer.rights')}</p>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">BELOTTI</div>
    </footer>
  );
}
