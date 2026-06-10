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

for (const [num, name] of Object.entries(MAP)) {
  try {
    const buf = await readFile(resolve(SRC, `${num}.png`))
    const webp = await sharp(buf)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer()
    await writeFile(resolve(OUT, `${name}.webp`), webp)
    console.log(`  ${num}.png -> media/${name}.webp`)
  } catch (err) {
    console.warn(`  skipped ${num}.png (${err.message})`)
  }
}

console.log('Photos optimized into public/media.')
