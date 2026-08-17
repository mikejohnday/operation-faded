// One-off asset preparation script (build plan §6 / §13 Stage 4).
// Crops + grades screenshot-derived source images from docs/research/instagram/
// into public/images/. Not part of the runtime app — run manually, then remove
// or leave as a documented provenance record.
import sharp from "sharp";
import { mkdirSync } from "fs";

const SRC = "docs/research/instagram";
const OUT = "public/images";

const OFF_WHITE = { r: 244, g: 243, b: 241 };

/** Shared grade: desaturate + tint toward the off-white/off-black token pair,
 * lift contrast slightly. Keeps every derived photo visually consistent. */
async function grade(pipeline) {
  return pipeline
    .greyscale()
    .linear(1.12, -10) // contrast lift
    .tint(OFF_WHITE);
}

const jobs = [
  {
    name: "hero",
    out: `${OUT}/hero.webp`,
    src: `${SRC}/03461b69-ba5a-4e07-92e8-490d8e17d071.png`,
    extract: { left: 35, top: 0, width: 690, height: 275 },
    resize: { width: 1600 },
    quality: 82,
  },
  {
    name: "wordmark",
    out: `${OUT}/wordmark.webp`,
    src: `${SRC}/cbd8efd9-0057-4e59-a223-1bc372bac3b5.png`,
    extract: { left: 315, top: 118, width: 165, height: 110 },
    resize: { width: 660 },
    quality: 90,
  },
  {
    name: "elliot",
    out: `${OUT}/team/elliot.webp`,
    src: `${SRC}/fa5c5cad-88cc-4f87-9931-c3eb250cdce9.png`,
    extract: { left: 70, top: 40, width: 590, height: 745 },
    resize: { width: 1180 },
    quality: 82,
  },
  {
    name: "bailey",
    out: `${OUT}/team/bailey.webp`,
    src: `${SRC}/9bfb5e18-1462-4837-b078-f84e07e2dcbd.png`,
    extract: { left: 70, top: 40, width: 600, height: 745 },
    resize: { width: 1200 },
    quality: 82,
  },
  {
    name: "work-1",
    out: `${OUT}/work/work-1.webp`,
    src: `${SRC}/25581b7e-be05-4f84-838d-924e13d1ca6a.png`,
    extract: { left: 380, top: 30, width: 340, height: 720 },
    resize: { width: 680 },
    quality: 82,
  },
  {
    name: "work-2",
    out: `${OUT}/work/work-2.webp`,
    src: `${SRC}/7010ab37-858f-4f1e-9cd6-22f02cc81f2b.png`,
    extract: { left: 0, top: 400, width: 640, height: 450 },
    resize: { width: 1280 },
    quality: 82,
  },
  {
    name: "instagram-tile-1",
    out: `${OUT}/instagram/tile-1.webp`,
    src: `${SRC}/db309254-4320-4bfb-a6b9-21726e02ab74.png`,
    extract: { left: 218, top: 434, width: 281, height: 384 },
    resize: { width: 562 },
    quality: 80,
  },
  {
    name: "instagram-tile-2",
    out: `${OUT}/instagram/tile-2.webp`,
    src: `${SRC}/db309254-4320-4bfb-a6b9-21726e02ab74.png`,
    extract: { left: 782, top: 434, width: 282, height: 384 },
    resize: { width: 564 },
    quality: 80,
  },
  {
    name: "instagram-tile-3",
    out: `${OUT}/instagram/tile-3.webp`,
    src: `${SRC}/db309254-4320-4bfb-a6b9-21726e02ab74.png`,
    extract: { left: 1064, top: 434, width: 282, height: 384 },
    resize: { width: 564 },
    quality: 80,
  },
  {
    name: "instagram-tile-4",
    out: `${OUT}/instagram/tile-4.webp`,
    src: `${SRC}/db309254-4320-4bfb-a6b9-21726e02ab74.png`,
    extract: { left: 1346, top: 434, width: 282, height: 384 },
    resize: { width: 564 },
    quality: 80,
  },
];

mkdirSync(`${OUT}/team`, { recursive: true });
mkdirSync(`${OUT}/work`, { recursive: true });
mkdirSync(`${OUT}/instagram`, { recursive: true });

for (const job of jobs) {
  let pipeline = sharp(job.src).extract(job.extract);
  pipeline = await grade(pipeline);
  await pipeline
    .resize({ width: job.resize.width, kernel: "lanczos3" })
    .webp({ quality: job.quality })
    .toFile(job.out);
  console.log(`wrote ${job.out}`);
}

console.log("done");
