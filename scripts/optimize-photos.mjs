/**
 * One-off: optimize the studio's source photos into web-ready WebP files in
 * public/media. Re-run any time you drop higher-resolution originals into the
 * source folder using the same numbered names.
 *
 *   node scripts/optimize-photos.mjs
 */
import sharp from 'sharp'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = 'C:/Users/durel/Pictures/k-design'
const OUT = resolve(root, 'public/media')

// source number -> semantic web name
const MAP = {
  1: 'kryx-matik',
  2: 'studio-flag',
  3: 'print-production',
  4: 'aerial-inspire',
  5: 'studio-bts',
  6: 'family-street',
  7: 'aerial-operator',
  8: 'studio-set',
  9: 'zaflex-jalousie',
  10: 'rosalie-giscard',
  11: 'nvasion',
  12: 'kate-4life',
  13: 'wyllyam-alp',
  14: 'brotherhood',
  15: 'dr-ndoumbe',
  16: 'logo-lockup',
}

await mkdir(OUT, { recursive: true })

// Two widths per image so mobile downloads a small file: a 640px variant
// (name-640.webp) and a 1200px master (name.webp). Poster picks via srcset.
const SIZES = [
  { suffix: '-640', width: 640, quality: 68 },
  { suffix: '', width: 1200, quality: 74 },
]

for (const [num, name] of Object.entries(MAP)) {
  try {
    const buf = await readFile(resolve(SRC, `${num}.png`))
    for (const s of SIZES) {
      const webp = await sharp(buf)
        .resize({ width: s.width, withoutEnlargement: true })
        .webp({ quality: s.quality, effort: 6 })
        .toBuffer()
      await writeFile(resolve(OUT, `${name}${s.suffix}.webp`), webp)
    }
    console.log(`  ${num}.png -> media/${name}.webp (+ -640)`)
  } catch (err) {
    console.warn(`  skipped ${num}.png (${err.message})`)
  }
}

console.log('Photos optimized into public/media (640 + 1200 variants).')
