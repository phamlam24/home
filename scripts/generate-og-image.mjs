// One-off generator for public/og-image.png — the link-preview image social
// platforms (Messenger, LinkedIn, iMessage, etc.) show when lampham.space is
// shared. Run with: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'public', 'og-image.png');

// Catppuccin Macchiato hex values (same palette as the site, just literal
// since SVG rasterization can't resolve CSS custom properties).
const mantle = '#1e2030';
const text = '#cad3f5';
const subtext = '#b8c0e0';
const teal = '#8bd5ca';
const mauve = '#c6a0f6';

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="28%" cy="22%" r="55%">
      <stop offset="0%" stop-color="${mauve}" stop-opacity="0.28" />
      <stop offset="100%" stop-color="${mauve}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="g2" cx="82%" cy="75%" r="60%">
      <stop offset="0%" stop-color="${teal}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${teal}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${mantle}" />
  <rect width="1200" height="630" fill="url(#g1)" />
  <rect width="1200" height="630" fill="url(#g2)" />
  <text x="80" y="290" font-family="Arial, sans-serif" font-size="104" font-weight="700" fill="${text}">Lam Pham</text>
  <text x="80" y="370" font-family="Arial, sans-serif" font-size="36" fill="${subtext}">Software engineer — web development, AI integrations, XR</text>
  <text x="80" y="560" font-family="Arial, sans-serif" font-size="28" font-weight="600" fill="${teal}">lampham.space</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`Wrote ${outPath}`);
