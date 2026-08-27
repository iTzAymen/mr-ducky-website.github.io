/**
 * Generates public/og-image.png — the 1200x630 social share card used by the
 * Open Graph / Twitter meta tags in index.html.
 *
 * Run with:  npm run og
 * The output is committed to the repo, so this only needs re-running when the
 * branding or tagline changes.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const W = 1200;
const H = 630;
const LOGO_H = 420;

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#00C6FF"/>
      <stop offset="46%" stop-color="#009DFF"/>
      <stop offset="100%" stop-color="#0A66E0"/>
    </linearGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="rgba(11,29,63,0.14)"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#0B1D3F"/>
</svg>`);

const caption = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .t { font-family: Arial, Helvetica, sans-serif; font-weight: 800; fill: #ffffff; }
  </style>
  <text x="${W / 2}" y="${H - 54}" text-anchor="middle" font-size="30"
        class="t" style="paint-order: stroke; stroke: #0B1D3F; stroke-width: 6px;">
    Fun, Creative &amp; Playful Roblox Game Development
  </text>
</svg>`);

const logo = await sharp(resolve(root, "src/assets/mr-ducky-logo-primary.png"))
  .resize({ height: LOGO_H })
  .toBuffer();
const { width: logoW } = await sharp(logo).metadata();

await sharp(background)
  .composite([
    {
      input: logo,
      top: Math.round((H - LOGO_H) / 2) - 24,
      left: Math.round((W - (logoW ?? LOGO_H)) / 2),
    },
    { input: caption, top: 0, left: 0 },
  ])
  .png()
  .toFile(resolve(root, "public/og-image.png"));

console.log("✓ wrote public/og-image.png");
