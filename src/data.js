// Structure, links and images mirror the original homepage at
// https://www.belottiotticaudito.ch/. Visible copy lives in src/i18n —
// `key` fields here are translation keys; brand/product names stay literal.
export const SITE = 'https://www.belottiotticaudito.ch';
const u = (p) => (p.startsWith('http') ? p : SITE + p);

export const NAV = [
  { key: 'nav.news', href: u('/blogs') },
  {
    key: 'nav.vista',
    href: u('/ottica'),
    children: [
      { key: 'nav.visionServices', href: u('/ottica') },
      { key: 'nav.specificGlasses', href: 'https://campagne.belottiotticaudito.ch/Occhiali-uso-specifico' },
      { key: 'nav.professionals', href: 'https://campagne.belottiotticaudito.ch/sistemi-ingrandenti-zeiss' },
      { key: 'nav.workSafety', href: 'https://campagne.belottiotticaudito.ch/sicurezza-sul-lavoro-uvex' },
    ],
  },
  { key: 'nav.udito', href: u('/udito') },
  { key: 'nav.otherSenses', href: u('/altri-prodotti') },
  {
    key: 'nav.about',
    href: u('/about-us'),
    children: [
      { key: 'nav.story', href: u('/about-us') },
      { key: 'nav.centers', href: u('/i-nostri-centri'), centers: true },
      { key: 'nav.contacts', href: u('/contact') },
    ],
  },
];

export const CENTERS = [
  ['Castione', '/castione'],
  ['Agno', '/agno'],
  ['Ascona', '/ascona'],
  ['Bellinzona', '/bellinzona'],
  ['Biasca', '/biasca'],
  ['Chiasso', '/chiasso'],
  ['Lugano', '/lugano'],
  ['Lugano Cassarate', '/cassarate'],
  ['Lugano Molino Nuovo', '/molino-nuovo'],
  ['Lugano Paradiso', '/Lugano-paradiso'],
  ['Locarno', '/locarno'],
  ['Mendrisio', '/mendrisio'],
  ['FoxTown', '/foxTown'],
  ['nav.mobileCenter', '/centro-mobile', true],
].map(([label, p, translated]) => ({ label, href: u(p), translated: !!translated }));

export const BOOK_URL = u('/blogs/post/ottobre-è-il-mese-della-vista');

// Responsive WebP renditions produced by scripts/images.mjs.
const pic = (name, widths) => ({
  src: `/img/${name}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(', '),
});

// Hero slides are live HTML (copy in i18n `hero.*`), with photography
// cropped clear of the original banners' baked-in text.
export const SLIDES = [
  { id: 'vista', theme: 'dusk', image: pic('hero-vista', [400, 600, 825]), href: BOOK_URL, ctaKey: 'hero.cta1' },
  { id: 'nuance', theme: 'mist', image: pic('hero-nuance', [400, 640, 920]), href: 'https://campagne.belottiotticaudito.ch/demo-nuance-audio', ctaKey: 'hero.cta2' },
  { id: 'exam', theme: 'plum', image: pic('hero-faces', [400, 640, 958]), href: 'https://forms.zoho.eu/belotti/form/RichiediinformazioniBelottiVista', ctaKey: 'hero.cta3' },
];

export const PROMO = {
  image: pic('promo', [400, 640, 900, 1200]),
  href: 'https://campagne.belottiotticaudito.ch/campagna-vista-ottobre-2025/',
};

export const CATEGORIES = [
  { key: 'categories.vista', href: u('/ottica'), image: '/img/cat-vista-530.webp', accent: 'plum' },
  { key: 'categories.udito', href: u('/udito'), image: '/img/cat-udito-530.webp', accent: 'teal' },
  { key: 'categories.otherSenses', href: u('/altri-prodotti'), image: '/img/cat-sensi-188.webp', accent: 'amber' },
];

const P = (n) => pic('p-' + n, [360, 640]);
export const FEATURED = [
  { name: 'Sacha Inchi - Oculea', price: 'CHF 26.60', image: P('sacha'), href: u('/blogs') },
  { name: 'Pochette Nude - Belotti Lifestyle', price: 'CHF 39.-', image: P('pochette'), href: u('/blogs') },
  { name: 'TAMI - Lighthouse Tech', price: null, image: P('tami'), href: u('/blogs') },
  { nameKey: 'featured.gucciMen', price: 'CHF 304.-', image: P('gucci'), href: u('/blogs/post/back-to-school') },
  { name: 'London Spice - Fragrance Du Bois', price: 'CHF 342.-', image: P('london'), href: null },
  { feature: true, image: pic('hero-vista', [400, 600, 825]), href: BOOK_URL },
  { name: 'OCCU', price: 'CHF 179.-', image: P('occu'), href: null },
  { name: 'LINDBERG', price: 'CHF 480.-', from: true, image: P('lindberg'), href: u('/blogs') },
];

const BRAND_NAMES = [
  'Balenciaga', 'Barton Perreira', 'Bottega Veneta', 'Bvlgari', 'Burberry', 'Cartier', 'Celine', 'Chanel', 'Chloé',
  'Dior', 'DITA Eyewear', 'Dolce & Gabbana', 'Fendi', 'Givenchy', 'Gucci', 'ic! berlin', 'Lighthouse', 'Lindberg',
  'Loewe', 'Maui Jim', 'Miu Miu', 'Montblanc', 'Nuance Audio', 'Oakley', 'OCCU', 'Oliver Peoples', 'Persol',
  'Polaroid Eyewear', 'Prada', 'Ray-Ban', 'Saint Laurent', 'Swarovski', 'Tiffany & Co.', 'Tom Ford', 'Valentino', 'ZEISS',
];
export const BRANDS = BRAND_NAMES.map((name, i) => ({ name, src: `/img/brands/${String(i + 1).padStart(2, '0')}.webp` }));

export const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/belottiotticaudito.ch/' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@belottiottica' },
  { name: 'Facebook', href: 'https://www.facebook.com/belottiotticauditoticino/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/belotti-otticaudito/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@belottiotticaudito47' },
  { name: 'WhatsApp', href: 'https://wa.me/41767516500' },
];

export const FOOTER_LINKS = [
  ['footer.about', '/about-us'],
  ['footer.optics', '/ottica'],
  ['footer.hearing', '/udito'],
  ['footer.centers', '/i-nostri-centri'],
  ['footer.news', '/blogs'],
  ['footer.contact', '/contact'],
  ['footer.careers', '/lavora-con-noi'],
].map(([key, p]) => ({ key, href: u(p) }));

export const LEGAL = [
  { key: 'footer.impressum', href: u('/impressum') },
  { key: 'footer.terms', href: 'https://www.iubenda.com/termini-e-condizioni/16196669' },
  { key: 'footer.privacy', href: 'https://www.iubenda.com/privacy-policy/16196669/full-legal' },
  { key: 'footer.cookies', href: 'https://www.iubenda.com/privacy-policy/16196669/cookie-policy' },
];
