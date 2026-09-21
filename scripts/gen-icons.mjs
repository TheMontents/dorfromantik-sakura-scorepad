/**
 * Generates the PWA icons (public/icon-192.png, public/icon-512.png): a cherry
 * blossom on a pink ground, written straight to PNG without dependencies.
 * Run with: npm run icons
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

const crc32 = (buf) => {
  let c = 0xffffffff
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const chunk = (type, data) => {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

const png = (width, height, rgba) => {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0 // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)

const BG_TOP = [229, 154, 170]
const BG_BOTTOM = [201, 86, 109]
const PETAL = [255, 255, 255]
const PETAL_EDGE = [242, 166, 196]
const CENTER = [224, 122, 165]

/** Colour of a point in unit coordinates (-1..1, y pointing down). */
const shade = (x, y) => {
  // Petals: five ellipses around the centre
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5
    const cos = Math.cos(a)
    const sin = Math.sin(a)
    const px = x * cos - y * sin
    const py = x * sin + y * cos + 0.50
    const d = (px / 0.27) ** 2 + (py / 0.36) ** 2
    if (d <= 1) return d > 0.78 ? mix(PETAL, PETAL_EDGE, (d - 0.78) / 0.22) : PETAL
  }
  if (x * x + y * y <= 0.19 ** 2) return CENTER
  return mix(BG_TOP, BG_BOTTOM, (y + 1) / 2)
}

const render = (size) => {
  const rgba = Buffer.alloc(size * size * 4)
  const radius = size * 0.22 // corner radius of the background
  const samples = 3
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0
      let g = 0
      let b = 0
      let a = 0
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const px = x + (sx + 0.5) / samples
          const py = y + (sy + 0.5) / samples
          // rounded square used as a mask
          const dx = Math.max(radius - px, px - (size - radius), 0)
          const dy = Math.max(radius - py, py - (size - radius), 0)
          if (Math.hypot(dx, dy) > radius) continue
          const [cr, cg, cb] = shade((px / size) * 2 - 1, (py / size) * 2 - 1)
          r += cr
          g += cg
          b += cb
          a += 255
        }
      }
      const total = samples * samples
      const i = (y * size + x) * 4
      const cover = a / (total * 255)
      rgba[i] = cover ? Math.round(r / (total * cover)) : 0
      rgba[i + 1] = cover ? Math.round(g / (total * cover)) : 0
      rgba[i + 2] = cover ? Math.round(b / (total * cover)) : 0
      rgba[i + 3] = Math.round(a / total)
    }
  }
  return png(size, size, rgba)
}

for (const size of [192, 512]) {
  const file = join(OUT_DIR, `icon-${size}.png`)
  writeFileSync(file, render(size))
  console.log(`written: ${file}`)
}
