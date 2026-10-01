// Shrinks oversized images in src/assets so the site loads fast.
// Usage:  npm run optimize-images
//
// - Any .png / .jpg / .jpeg / .webp wider or taller than MAX_SIZE px is resized
//   (keeping its shape) and saved back to the SAME file name, so nothing in the
//   code needs to change.
// - Images that are already small enough are left alone, so it's safe to run
//   every time you add new work.

import { readdir, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "src/assets";
const MAX_SIZE = 1800; // px on the longest side
const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTS.has(extname(entry.name).toLowerCase())) yield full;
  }
}

let saved = 0;
for await (const file of walk(ROOT)) {
  const img = sharp(file, { failOn: "none" });
  const { width = 0, height = 0 } = await img.metadata();
  if (Math.max(width, height) <= MAX_SIZE) continue;

  const before = (await stat(file)).size;
  const ext = extname(file).toLowerCase();
  let pipeline = img.rotate().resize({
    width: MAX_SIZE,
    height: MAX_SIZE,
    fit: "inside",
    withoutEnlargement: true,
  });
  if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9, palette: false });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: 85 });
  else pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });

  const buffer = await pipeline.toBuffer();
  await writeFile(file, buffer);
  saved += before - buffer.length;
  console.log(`resized ${file}  ${width}x${height}  ${(before / 1e6).toFixed(1)}MB -> ${(buffer.length / 1e6).toFixed(1)}MB`);
}
console.log(`Done. Saved ${(saved / 1e6).toFixed(1)} MB.`);
