/**
 * Rasterizes the brand SVGs into the PNG assets referenced by index.html and
 * site.webmanifest (favicon, app icons, social share image).
 *
 * Run with:  node scripts/generate-assets.mjs
 * Requires:  sharp  (installed as a devDependency)
 */
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const favicon = await readFile(resolve(root, 'public/favicon.svg'))
const og = await readFile(resolve(root, 'brand/og-image.svg'))

const out = (p) => resolve(root, 'public', p)

const jobs = [
  { svg: favicon, size: 32, file: 'favicon-32.png' },
  { svg: favicon, size: 180, file: 'apple-touch-icon.png' },
  { svg: favicon, size: 192, file: 'android-chrome-192.png' },
  { svg: favicon, size: 512, file: 'android-chrome-512.png' },
]

for (const job of jobs) {
  const png = await sharp(job.svg, { density: 384 })
    .resize(job.size, job.size, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
    .png()
    .toBuffer()
  await writeFile(out(job.file), png)
  console.log(`  generated ${job.file} (${job.size}x${job.size})`)
}

// Social share image (PNG for WhatsApp / Facebook / LinkedIn / X)
const ogPng = await sharp(og, { density: 144 }).resize(1200, 630).png().toBuffer()
await writeFile(out('og-image.png'), ogPng)
console.log('  generated og-image.png (1200x630)')

console.log('Brand assets generated.')
