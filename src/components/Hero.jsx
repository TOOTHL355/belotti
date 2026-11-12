import { useCallback, useEffect, useRef, useState } from 'react';
import { SLIDES } from '../data.js';
import { Arrow, Pause, Play } from './Icons.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const DURATION = 7000;

// Live-HTML hero: real, translatable, indexable headlines set in the page's
// own type, with photography cropped out of the campaign banners.
function SlideCopy({ id, t }) {
  if (id === 'vista')
    return (
      <>
        <p className="hero-kicker">{t('hero.s1.kicker')}</p>
        <h2 className="hero-title">
          {t('hero.s1.titleA')}
          <strong>{t('hero.s1.titleB')}</strong>
        </h2>
      </>
    );
  if (id === 'nuance')
    return (
      <>
        <p className="hero-kicker hero-kicker-brand">
          <span className="nuance-dots" aria-hidden="true"><i /><i /><i /><i /></span>
          {t('hero.s2.kicker')}
        </p>
        <h2 className="hero-title">{t('hero.s2.title')}</h2>
        <p className="hero-body">{t('hero.s2.body')}</p>
        <p className="hero-note">
          {t('hero.s2.noteA')}<strong>{t('hero.s2.noteB')}</strong> {t('hero.s2.demo')}
        </p>
      </>
    );
  return (
    <>
      <p className="hero-kicker">{t('hero.s3.kicker')}</p>
      <h2 className="hero-title">
        {t('hero.s3.titleA')}
        <em>{t('hero.s3.titleB')}</em>
      </h2>
      <p className="hero-body hero-body-tag">{t('hero.s3.body')}</p>
    </>
  );
}

const ALT = { vista: 'hero.s1.alt', nuance: 'hero.s2.alt', exam: 'hero.s3.alt' };

export default function Hero() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [warm, setWarm] = useState(false);
  const touch = useRef(null);
  const n = SLIDES.length;

  const go = useCallback((i) => setIndex(((i % n) + n) % n), [n]);

  // Off-screen slides stay lazy until the page has loaded, so they never
  // compete with the first slide (the LCP image) for bandwidth.
  useEffect(() => {
    const warmUp = () => setTimeout(() => setWarm(true), 800);
    if (document.readyState === 'complete') warmUp();
    else window.addEventListener('load', warmUp, { once: true });
  }, []);

  // No autoplay for reduced-motion users.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
  }, []);

  const running = playing && !hovered;
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(timer);
  }, [index, running, go]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label={t('hero.label')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="hero-stage" aria-live={running ? 'off' : 'polite'}>
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <article
              key={s.id}
              className={`slide slide-${s.theme} ${active ? 'is-active' : ''}`}
              aria-hidden={!active}
              aria-roledescription="slide"
              aria-label={t('hero.slideOf', { n: i + 1, total: n })}
              inert={active ? undefined : ''}
            >
              <div className="slide-copy">
                <SlideCopy id={s.id} t={t} />
                <a href={s.href} className="btn slide-cta">
                  {t(s.ctaKey)} <Arrow width={18} height={18} />
                </a>
                {s.id === 'nuance' && <p className="hero-fine">{t('hero.s2.fine')}</p>}
                {s.id !== 'nuance' && <p className="hero-sign">BELOTTI <span>{t('hero.tagline')}</span></p>}
              </div>
              <div className="slide-media">
                <img
                  src={s.image.src}
                  srcSet={s.image.srcSet}
                  sizes={s.id === 'exam' ? '(max-width: 820px) 100vw, 60vw' : '(max-width: 820px) 100vw, 50vw'}
                  alt={t(ALT[s.id])}
                  fetchpriority={i === 0 ? 'high' : undefined}
                  loading={i === 0 || warm ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className="hero-controls">
        <button className="hero-arrow" aria-label={t('hero.prev')} onClick={() => go(index - 1)}>
          <Arrow width={18} height={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="hero-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              aria-current={i === index ? 'true' : undefined}
              aria-label={t('hero.goTo', { n: i + 1 })}
              className={`dot ${i === index ? 'is-active' : ''} ${running ? '' : 'is-paused'}`}
              onClick={() => go(i)}
              style={{ '--d': `${DURATION}ms` }}
            >
              <span key={i === index ? index : 'idle'} />
            </button>
          ))}
        </div>
        <button className="hero-arrow" aria-label={t('hero.next')} onClick={() => go(index + 1)}>
          <Arrow width={18} height={18} />
        </button>
        <button
          className="hero-arrow hero-play"
          aria-label={playing ? t('hero.pause') : t('hero.play')}
          aria-pressed={!playing}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause /> : <Play />}
        </button>
      </div>
    </section>
  );
}
