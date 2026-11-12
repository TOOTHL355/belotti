import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { STORES, STORE_BOOKING, telHref, mapsHref, openStatus, distanceKm } from '../stores.js';
import { Phone, Route, Calendar, Locate, Search, External, Pin } from './Icons.jsx';

// Schematic "Linea Belotti" — a transit-style diagram, not a geographic map:
// the trunk runs north→south through the Ticino valley, with branches west
// to the Locarnese and to Agno.
const MAP = {
  biasca: [230, 40], castione: [230, 100], bellinzona: [230, 160],
  'molino-nuovo': [230, 280], cassarate: [230, 325], lugano: [230, 370], paradiso: [230, 415],
  mendrisio: [230, 495], foxtown: [230, 540], chiasso: [230, 590],
  locarno: [135, 220], ascona: [55, 220], agno: [110, 370],
};
const LABEL_LEFT = new Set(['locarno', 'ascona', 'agno']);

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function daysLabel(days, short) {
  if (days.length === 7) return `${short[1]}–${short[0]}`;
  const sorted = [...days].sort();
  const contiguous = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  if (contiguous && sorted.length > 1) return `${short[sorted[0]]}–${short[sorted[sorted.length - 1]]}`;
  return sorted.map((d) => short[d]).join(', ');
}

function Status({ store, now, t, raw }) {
  if (!now) return <span className="status status-pending" aria-hidden="true" />;
  const s = openStatus(store, now);
  if (s.state === 'onRequest') return <span className="status status-request">{t('stores.onRequest')}</span>;
  if (s.state === 'open')
    return (
      <span className="status status-open">
        <i aria-hidden="true" />{t('stores.open')} · {t('stores.closesAt', { time: s.until })}
      </span>
    );
  let when = '';
  if (s.next) {
    if (s.next.today) when = t('stores.opensAt', { time: s.next.time });
    else if (s.next.tomorrow) when = t('stores.opensTomorrow', { time: s.next.time });
    else when = t('stores.opensDay', { day: raw('stores.days')[s.next.day], time: s.next.time });
  }
  return (
    <span className="status status-closed">
      <i aria-hidden="true" />{t('stores.closed')}{when && ` · ${when}`}
    </span>
  );
}

export default function StoreFinder() {
  const { t, raw, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [selected, setSelected] = useState('lugano');
  const [origin, setOrigin] = useState(null);
  const [geo, setGeo] = useState('idle'); // idle | locating | error
  const [now, setNow] = useState(null);
  const listRef = useRef(null);

  // Opening status depends on the clock — compute after mount so the
  // pre-rendered HTML and the first client render match.
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const name = (s) => (s.nameKey ? t(s.nameKey) : s.name);

  const stores = useMemo(() => {
    const q = norm(query.trim());
    let list = STORES.filter((s) => (region === 'all' ? true : s.region === region));
    if (q) list = list.filter((s) => norm(`${s.name} ${s.city} ${s.street} ${s.zip}`).includes(q));
    if (origin) {
      list = list
        .map((s) => ({ ...s, km: s.lat == null ? null : distanceKm(origin, s) }))
        .sort((a, b) => (a.km ?? 1e9) - (b.km ?? 1e9));
    }
    return list;
  }, [query, region, origin]);

  const locate = () => {
    if (!('geolocation' in navigator)) return setGeo('error');
    setGeo('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const o = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setOrigin(o);
        setGeo('idle');
        setRegion('all');
        const nearest = STORES.filter((s) => s.lat != null && s.kind !== 'hq').sort((a, b) => distanceKm(o, a) - distanceKm(o, b))[0];
        if (nearest) setSelected(nearest.id);
      },
      () => setGeo('error'),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600_000 }
    );
  };

  const pick = (id, scroll) => {
    setSelected(id);
    if (scroll) listRef.current?.querySelector(`[data-store="${id}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  const fmtKm = (km) => km.toLocaleString(language === 'it' ? 'it-CH' : 'en-GB', { maximumFractionDigits: km < 10 ? 1 : 0 });
  const visible = new Set(stores.map((s) => s.id));
  const short = raw('stores.daysShort');

  return (
    <section className="stores reveal" id="centri" aria-labelledby="stores-title">
      <div className="container">
        <div className="stores-head">
          <div>
            <p className="eyebrow">{t('stores.eyebrow')}</p>
            <h2 className="display stores-title" id="stores-title">{t('stores.title')}</h2>
          </div>
          <p className="stores-lead">{t('stores.lead')}</p>
        </div>

        <div className="stores-grid">
          <div className="stores-panel">
            <div className="stores-tools">
              <label className="search">
                <Search aria-hidden="true" />
                <span className="sr-only">{t('stores.search')}</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('stores.search')}
                  autoComplete="off"
                />
              </label>
              <button type="button" className="btn btn-ghost locate" onClick={locate} disabled={geo === 'locating'}>
                <Locate /> {geo === 'locating' ? t('stores.locating') : t('stores.locate')}
              </button>
            </div>
            <div className="chips" role="group" aria-label={t('stores.eyebrow')}>
              {['all', 'sottoceneri', 'sopraceneri', 'mobile'].map((r) => (
                <button key={r} type="button" className={`chip ${region === r ? 'is-active' : ''}`} aria-pressed={region === r} onClick={() => setRegion(r)}>
                  {t('stores.' + r)}
                </button>
              ))}
              <span className="chips-count" aria-live="polite">{t('stores.count', { n: stores.length })}</span>
            </div>
            {geo === 'error' && <p className="stores-error" role="status">{t('stores.locateError')}</p>}

            <ul className="store-list" ref={listRef}>
              {stores.length === 0 && <li className="store-empty">{t('stores.none')}</li>}
              {stores.map((s) => {
                const open = s.id === selected;
                return (
                  <li key={s.id} data-store={s.id} className={`store ${open ? 'is-open' : ''}`}>
                    <button type="button" className="store-head" aria-expanded={open} onClick={() => pick(open ? null : s.id)}>
                      <span className="store-name">
                        {name(s)}
                        {s.km != null && <span className="store-km">{t('stores.away', { km: fmtKm(s.km) })}</span>}
                      </span>
                      <span className="store-addr">
                        {s.kind === 'hq' ? t('stores.hq') : s.kind === 'mobile' ? t('stores.mobileDesc') : `${s.street}, ${s.zip} ${s.city}`}
                      </span>
                      <Status store={s} now={now} t={t} raw={raw} />
                    </button>
                    <div className="store-body">
                      <div>
                        <div className="store-detail">
                          {s.hours && (
                            <div>
                              <p className="store-h">{t('stores.hours')}</p>
                              <dl className="hours">
                                {s.hours.map(([days, o, c], i) => (
                                  <div key={i}>
                                    <dt>{daysLabel(days, short)}</dt>
                                    <dd>{o}–{c}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          )}
                          {s.services.length > 0 && (
                            <div>
                              <p className="store-h">{t('stores.services')}</p>
                              <ul className="svc">
                                {s.services.map((k) => <li key={k}>{t('stores.svc.' + k)}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="store-actions">
                          <a className="act" href={telHref(s.phone)}><Phone /> {t('stores.call')}<span className="act-sub">{s.phone}</span></a>
                          {s.kind !== 'mobile' && (
                            <a className="act" href={mapsHref(s)} target="_blank" rel="noreferrer"><Route /> {t('stores.directions')}</a>
                          )}
                          {s.kind !== 'hq' && (
                            <a className="act act-primary" href={STORE_BOOKING} target="_blank" rel="noreferrer"><Calendar /> {t('stores.book')}</a>
                          )}
                          <a className="act act-link" href={s.url}>{t('stores.details')} <External /></a>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <figure className="metro" aria-label={t('stores.mapLabel')}>
            <figcaption className="metro-cap">
              <span className="metro-badge">B</span> {t('stores.line')}
            </figcaption>
            <svg viewBox="0 0 380 620" role="group">
              <defs>
                <linearGradient id="trunk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e9a24f" />
                  <stop offset=".5" stopColor="#7b3fa0" />
                  <stop offset="1" stopColor="#1fa69a" />
                </linearGradient>
              </defs>
              <path d="M230 40V590" className="metro-line" stroke="url(#trunk)" />
              <path d="M230 160L170 220H55" className="metro-line" stroke="#1fa69a" />
              <path d="M230 370H110" className="metro-line" stroke="#e9a24f" />
              <text x="246" y="226" className="metro-pass">Monte Ceneri</text>
              {STORES.filter((s) => MAP[s.id]).map((s) => {
                const [x, y] = MAP[s.id];
                const isSel = s.id === selected;
                const dim = !visible.has(s.id);
                const st = now ? openStatus(s, now).state : null;
                const left = LABEL_LEFT.has(s.id);
                return (
                  <g
                    key={s.id}
                    className={`station ${isSel ? 'is-sel' : ''} ${dim ? 'is-dim' : ''}`}
                    transform={`translate(${x} ${y})`}
                    onClick={() => pick(s.id, true)}
                    role="button"
                    tabIndex={dim ? -1 : 0}
                    aria-label={name(s)}
                    aria-pressed={isSel}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pick(s.id, true))}
                  >
                    <circle className="station-hit" r="18" />
                    {isSel && <circle className="station-halo" r="17" />}
                    <circle className="station-dot" r={isSel ? 10 : 7} />
                    {st === 'open' && <circle className="station-open" r="3" />}
                    <text
                      className="station-label"
                      x={left ? 0 : 22}
                      y={left ? -16 : 5}
                      textAnchor={left ? 'middle' : 'start'}
                    >
                      {s.name === 'Lugano' ? s.name : s.name.replace('Lugano ', '')}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="metro-legend">
              <span><i className="lg-open" /> {t('stores.open')}</span>
              <button type="button" className={`metro-mobile ${selected === 'mobile' ? 'is-sel' : ''}`} onClick={() => pick('mobile', true)}>
                <Pin /> {t('stores.mobileName')} · {t('stores.onRequest')}
              </button>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
