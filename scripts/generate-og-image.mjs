// Generates app/opengraph-image.png from the already-graded wordmark crop
// (build plan §11). A static file, not next/og's ImageResponse — simpler,
// no extra runtime dependency, proportionate to a one-page prototype.
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const BG = { r: 11, g: 11, b: 12, alpha: 1 };

const wordmark = await sharp("public/images/wordmark.webp")
  .resize({ width: 460 })
  .toBuffer();
const wordmarkMeta = await sharp(wordmark).metadata();

const wordmarkTop = 150;
const textSvg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="${wordmarkTop + wordmarkMeta.height + 90}" text-anchor="middle"
    font-family="Arial, sans-serif" font-size="34" font-weight="700"
    letter-spacing="2" fill="#f4f3f1">50 MICKLEGATE, SELBY</text>
  <text x="50%" y="${wordmarkTop + wordmarkMeta.height + 140}" text-anchor="middle"
    font-family="Arial, sans-serif" font-size="26" fill="#a8a6a3">Book your next cut via Squire</text>
</svg>`;

await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 4, background: BG },
})
  .composite([
    {
      input: wordmark,
      top: wordmarkTop,
      left: Math.round((WIDTH - wordmarkMeta.width) / 2),
    },
    { input: Buffer.from(textSvg), top: 0, left: 0 },
  ])
  .png()
  .toFile("app/opengraph-image.png");

console.log("wrote app/opengraph-image.png");
