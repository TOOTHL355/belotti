import { useRef, useState, useEffect } from 'react';
import { PROMO, CATEGORIES, FEATURED, BRANDS } from '../data.js';
import { Arrow } from './Icons.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export function Promo() {
  const { t } = useLanguage();
  return (
    <section className="promo reveal" id="promo">
      <div className="container promo-grid">
        <a href={PROMO.href} className="promo-media">
          <img
            src={PROMO.image.src}
            srcSet={PROMO.image.srcSet}
            sizes="(max-width: 600px) calc(100vw - 80px), (max-width: 980px) 80vw, 560px"
            width="1200" height="1200"
            alt={t('promo.imageAlt')}
            loading="lazy" decoding="async"
          />
        </a>
        <div className="promo-copy">
          <p className="eyebrow">{t('promo.eyebrow')}</p>
          <h2 className="display">{t('promo.title')}</h2>
          <div className="promo-text">
            <p>
              {t('promo.p1a')}<strong>{t('promo.p1b')}</strong>{t('promo.p1c')}
            </p>
            <p>
              {t('promo.p2a')}<strong>{t('promo.p2b')}</strong>{t('promo.p2c')}<strong>{t('promo.p2d')}</strong>{t('promo.p2e')}
            </p>
            <p className="promo-highlight">
              {t('promo.p3a')}<strong>{t('promo.p3b')}</strong>{t('promo.p3c')}
            </p>
          </div>
          <a href={PROMO.href} className="btn btn-primary btn-lg">
            {t('promo.cta')} <Arrow width={18} height={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  const { t } = useLanguage();
  return (
    <section className="categories reveal">
      <div className="container">
        <div className="cat-grid">
          {CATEGORIES.map((c, i) => (
            <a key={c.key} href={c.href} className={`cat-card cat-${c.accent}`} style={{ '--i': i }}>
              <span className="cat-img">
                <img src={c.image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="cat-foot">
                <span className="cat-num">0{i + 1}</span>
                <span className="cat-label">{t(c.key)}</span>
                <Arrow className="cat-arrow" width={20} height={20} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Featured() {
  const { t } = useLanguage();
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(update, []);

  const scroll = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="featured reveal">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">
            <span className="title-mark" aria-hidden="true" />{t('featured.title')}
          </h2>
          <div className="track-ctrl">
            <button aria-label={t('featured.prev')} disabled={edge.start} onClick={() => scroll(-1)}>
              <Arrow width={18} height={18} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button aria-label={t('featured.next')} disabled={edge.end} onClick={() => scroll(1)}>
              <Arrow width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="track" ref={track} onScroll={update}>
        {FEATURED.map((p, i) => {
          const Tag = p.href ? 'a' : 'div';
          if (p.feature)
            return (
              <a key={i} href={p.href} className="card card-feature">
                <img src={p.image.src} srcSet={p.image.srcSet} sizes="(max-width: 600px) 86vw, 420px" alt="" loading="lazy" decoding="async" />
                <span className="card-feature-copy">
                  <span className="card-feature-title">
                    {t('featured.examA')}<em>{t('featured.examB')}</em>
                  </span>
                  <span className="card-feature-sub">
                    {t('featured.gucciOffer')}<strong>CHF 349.-</strong>
                  </span>
                </span>
              </a>
            );
          const name = p.nameKey ? t(p.nameKey) : p.name;
          return (
            <Tag key={i} href={p.href || undefined} className="card">
              <span className="card-img">
                <img src={p.image.src} srcSet={p.image.srcSet} sizes="(max-width: 600px) 76vw, 300px" width="640" height="640" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="card-body">
                <span className="card-name">{name}</span>
                {p.price && <span className="card-price">{p.from ? t('featured.from', { price: p.price }) : p.price}</span>}
              </span>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

// Static logo wall (no auto-motion → nothing to pause, WCAG 2.2.2).
export function Brands() {
  const { t } = useLanguage();
  const [all, setAll] = useState(false);
  return (
    <section className="brands reveal">
      <div className="container">
        <h2 className="section-title center">
          <span className="title-mark" aria-hidden="true" />{t('brands.title')}
        </h2>
        <ul className={`brand-wall ${all ? 'is-all' : ''}`} id="brand-wall">
          {BRANDS.map((b) => (
            <li key={b.name} className="brand-cell">
              <img src={b.src} alt={b.name} title={b.name} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        <div className="brand-more">
          <button type="button" className="btn btn-ghost" aria-expanded={all} aria-controls="brand-wall" onClick={() => setAll((v) => !v)}>
            {all ? t('brands.less') : t('brands.more')}
          </button>
        </div>
      </div>
    </section>
  );
}
