// Static pre-rendering: renders the app once per language into real HTML
// (dist/index.html = Italian, dist/en/index.html = English), with per-language
// <head> metadata, hreflang alternates, Open Graph, and schema.org JSON-LD
// for the company and every centre. The client then hydrates it.
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE_URL = (process.env.SITE_URL || 'https://www.belottiotticaudito.ch').replace(/\/$/, '');
const DIST = 'dist';

const server = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const { render, translations, LANGUAGES, STORES, hoursSpec, telHref } = server;
let template = await readFile(path.join(DIST, 'index.html'), 'utf8');
// Inline the (small) stylesheet: removes a render-blocking round trip.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = await readFile(path.join(DIST, cssLink[1]), 'utf8');
  template = template.replace(cssLink[0], () => `<style>${css}</style>`);
}
const assets = await readdir(path.join(DIST, 'assets'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const fontFile = (needle) => assets.find((f) => f.startsWith(needle) && f.endsWith('.woff2'));
const preloadFonts = ['lato-latin-400-normal', 'cormorant-garamond-latin-600-normal']
  .map(fontFile)
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join('\n    ');

const SOCIAL = [
  'https://www.instagram.com/belottiotticaudito.ch/',
  'https://www.tiktok.com/@belottiottica',
  'https://www.facebook.com/belottiotticauditoticino/',
  'https://www.linkedin.com/company/belotti-otticaudito/',
  'https://www.youtube.com/@belottiotticaudito47',
];

function jsonLd(lang) {
  const org = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org`,
    name: 'Belotti OtticaUdito',
    legalName: 'Ottica Belotti SA',
    url: SITE_URL + '/',
    logo: `${SITE_URL}/brand/belotti-logo-dark.png`,
    foundingDate: '1988',
    taxID: 'CHE-107.453.165',
    address: { '@type': 'PostalAddress', streetAddress: 'Via Retica 2', postalCode: '6532', addressLocality: 'Castione-Arbedo', addressRegion: 'TI', addressCountry: 'CH' },
    sameAs: SOCIAL,
  };
  const stores = STORES.filter((s) => s.kind !== 'hq').map((s) => ({
    '@type': 'Optician',
    '@id': `${s.url}#store`,
    name: `Belotti OtticaUdito ${s.nameKey ? translations[lang].stores.mobileName : s.name}`,
    url: s.url,
    telephone: telHref(s.phone).slice(4),
    ...(s.email && { email: s.email }),
    image: `${SITE_URL}/img/hero-vista-825.webp`,
    priceRange: 'CHF',
    address: { '@type': 'PostalAddress', streetAddress: s.street, postalCode: s.zip, addressLocality: s.city, addressRegion: 'TI', addressCountry: 'CH' },
    ...(s.lat != null && { geo: { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lng } }),
    ...(s.hours && { openingHoursSpecification: hoursSpec(s) }),
    parentOrganization: { '@id': `${SITE_URL}/#org` },
  }));
  const site = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#site`,
    url: SITE_URL + '/',
    name: 'Belotti OtticaUdito',
    inLanguage: ['it-CH', 'en'],
    publisher: { '@id': `${SITE_URL}/#org` },
  };
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [org, site, ...stores] }).replace(/</g, '\\u003c');
}

const urls = [];
for (const { code, path: urlPath } of LANGUAGES) {
  const meta = translations[code].meta;
  const pageUrl = SITE_URL + urlPath;
  urls.push(pageUrl);
  const alternates = LANGUAGES.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${SITE_URL + l.path}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">`)
    .join('\n    ');

  const head = `<link rel="canonical" href="${pageUrl}">
    ${alternates}
    ${preloadFonts}
    <link rel="preload" as="image" href="/img/hero-vista-825.webp" imagesrcset="/img/hero-vista-400.webp 400w, /img/hero-vista-600.webp 600w, /img/hero-vista-825.webp 825w" imagesizes="(max-width: 820px) 100vw, 50vw" fetchpriority="high">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Belotti OtticaUdito">
    <meta property="og:locale" content="${code === 'it' ? 'it_CH' : 'en_GB'}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:title" content="${esc(meta.title)}">
    <meta property="og:description" content="${esc(meta.description)}">
    <meta property="og:image" content="${SITE_URL}/img/hero-vista-825.webp">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${jsonLd(code)}</script>`;

  const html = template
    .replace('<html lang="it">', `<html lang="${code}">`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(meta.description)}" />`)
    .replace('<!--head-->', head)
    .replace('<!--app-->', render(code));

  const outDir = path.join(DIST, urlPath);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`prerendered ${urlPath} (${(html.length / 1024).toFixed(0)} KB)`);
}

await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url><loc>${u}</loc>${LANGUAGES.map((l) => `<xhtml:link rel="alternate" hreflang="${l.code}" href="${SITE_URL + l.path}"/>`).join('')}</url>`
  )
  .join('\n')}
</urlset>
`
);
await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await rm('dist-server', { recursive: true, force: true });
