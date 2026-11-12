// Builds optimised WebP renditions from assets-src/ into public/img/.
// Run: npm run images   (idempotent — safe to re-run after adding sources)
//
// Each entry: source file, optional crop {left, top, width, height} in source
// pixels (used to lift text-free photography out of the campaign banners),
// and the widths to emit. Output name: <out>-<width>.webp
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/img';

const JOBS = [
  // Hero photography, cropped clear of baked-in copy and logos
  { src: 'Camp-Belotti-PA-Vista-Ott2026-homepage-banner-mobile-2000x2000.jpg', out: 'hero-vista', crop: { left: 160, top: 880, width: 825, height: 720 }, widths: [400, 600, 825] },
  { src: 'Camp-Belotti-Nuance-Dic2025-homepage-banner-mobile-2-2000x2000.jpg', out: 'hero-nuance', crop: { left: 360, top: 560, width: 920, height: 440 }, widths: [400, 640, 920] },
  { src: 'Camp-Belotti-PROMO-Vista-Ott2025-homepage-banner-mobile-2000x2000.jpg', out: 'hero-faces', crop: { left: 322, top: 795, width: 958, height: 600 }, widths: [400, 640, 958] },
  // Promo creative (kept whole — it is the campaign artwork)
  { src: 'Camp-Belotti-PROMO-Vista-Ott2025-homepage-banner-mobile-2000x2000.jpg', out: 'promo', widths: [400, 640, 900, 1200] },
  // Category photos — the site's wider 530×350 "tablet" versions where they exist
  { src: 'Ottica_Gaia_tablet.png', out: 'cat-vista', widths: [530] },
  { src: 'Udito_Oticon_tablet.png', out: 'cat-udito', widths: [530] },
  { src: 'Progetto-senza-titolo--17-.png', out: 'cat-sensi', widths: [188] },
  // Products (1600² PNG originals → card sizes)
  { src: 'sacha-inchi-WEB.png', out: 'p-sacha', widths: [360, 640] },
  { src: 'Gemini_Generated_Image_vxov4ovxov4ovxov.jpeg', out: 'p-pochette', widths: [360, 640] },
  { src: 'TAMI-sito.png', out: 'p-tami', widths: [360, 640] },
  { src: 'GUCCI-SITO.png', out: 'p-gucci', widths: [360, 640] },
  { src: 'London-Spice-2.png', out: 'p-london', widths: [360, 640] },
  { src: 'OCCU_sito.png', out: 'p-occu', widths: [360, 640] },
  { src: 'LINDBERG_sito.png', out: 'p-lindberg', widths: [360, 640] },
];

await mkdir(OUT, { recursive: true });
await mkdir(path.join(OUT, 'brands'), { recursive: true });

let total = 0;
for (const job of JOBS) {
  for (const w of job.widths) {
    let img = sharp(path.join(SRC, job.src));
    if (job.crop) img = img.extract(job.crop);
    const info = await img
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(path.join(OUT, `${job.out}-${w}.webp`));
    total += info.size;
  }
}

// Brand logos: transparent PNG → lossless-ish WebP at display size (2× of 120px)
for (const f of (await readdir(path.join(SRC, 'brands'))).filter((f) => f.endsWith('.png'))) {
  const info = await sharp(path.join(SRC, 'brands', f))
    .resize({ height: 96, withoutEnlargement: true })
    .webp({ quality: 85, alphaQuality: 90, effort: 6 })
    .toFile(path.join(OUT, 'brands', f.replace('.png', '.webp')));
  total += info.size;
}

console.log(`images: ${(total / 1024).toFixed(0)} KB written to ${OUT}`);
