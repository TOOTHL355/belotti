import { useEffect, useState } from 'react';
import LanguageToggle from './ui/LanguageToggle.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { NAV, CENTERS, SITE } from '../data.js';
import { STORE_BOOKING } from '../stores.js';
import { Chevron, Menu, Close, Pin, Arrow } from './Icons.jsx';

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const centerLabel = (c) => (c.translated ? t(c.label) : c.label);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`theme-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="skip" href="#main">{t('site.skip')}</a>
      <div className="header-inner">
        <a href={SITE + '/'} className="brand" aria-label={t('site.home')}>
          <img className="brand-logo" src="/brand/belotti-eyewear-perfume-logo.png" alt="Belotti Eyewear & Perfume" width="2170" height="725" />
        </a>

        <nav className="nav" aria-label={t('site.mainNav')}>
          <ul>
            {NAV.map((item) => (
              <li key={item.key} className={item.children ? 'has-menu' : ''}>
                <a href={item.href}>
                  {t(item.key)}
                  {item.children && <Chevron className="chev" />}
                </a>
                {item.children && (
                  <div className={`dropdown ${item.children.some((c) => c.centers) ? 'dropdown-wide' : ''}`}>
                    <ul className="dropdown-list">
                      {item.children.map((c) => (
                        <li key={c.key}>
                          <a href={c.href}>
                            <span>{t(c.key)}</span>
                            <Arrow width={16} height={16} />
                          </a>
                        </li>
                      ))}
                    </ul>
                    {item.children.some((c) => c.centers) && (
                      <div className="centers">
                        <p className="centers-title">{t('nav.centers')}</p>
                        <ul>
                          {CENTERS.map((c) => (
                            <li key={c.href}>
                              <a href={c.href}><Pin />{centerLabel(c)}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <a className="btn btn-primary header-cta" href={STORE_BOOKING} target="_blank" rel="noreferrer">{t('site.bookNow')}</a>
          <button
            className="burger"
            aria-label={open ? t('site.closeMenu') : t('site.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul className="drawer-list">
          {NAV.map((item, i) => (
            <li key={item.key} style={{ '--i': i }}>
              {item.children ? (
                <>
                  <button
                    className="drawer-toggle"
                    aria-expanded={expanded === item.key}
                    onClick={() => setExpanded(expanded === item.key ? null : item.key)}
                  >
                    {t(item.key)}
                    <Chevron className={expanded === item.key ? 'rot' : ''} width={20} height={20} />
                  </button>
                  <div className={`drawer-sub ${expanded === item.key ? 'is-open' : ''}`}>
                    <div>
                      {item.children.map((c) => (
                        <div key={c.key}>
                          <a href={c.href}>{t(c.key)}</a>
                          {c.centers && (
                            <div className="drawer-centers">
                              {CENTERS.map((cc) => (
                                <a key={cc.href} href={cc.href}>{centerLabel(cc)}</a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a href={item.href}>{t(item.key)}</a>
              )}
            </li>
          ))}
        </ul>
        <a className="btn btn-primary drawer-cta" href={STORE_BOOKING} target="_blank" rel="noreferrer">{t('site.bookNow')}</a>
      </div>
    </header>
  );
}
