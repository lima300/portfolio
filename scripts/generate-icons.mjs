#!/usr/bin/env node
/**
 * Draws the site's icons from the header monogram: "OL" in Inter SemiBold,
 * with the green dot (src/components/ui/brand-mark.tsx).
 *
 * The header sets the mark in live text; an icon cannot rely on a font, so
 * this renders it to PNG with the same engine and font files as the Open
 * Graph cards (next/og, src/assets/fonts), and writes the files Next serves
 * by convention:
 *
 *   src/app/favicon.ico     16, 32 and 48 px, for tabs and bookmarks
 *   src/app/icon.png        512 px, for search results and Android
 *   src/app/apple-icon.png  180 px, full bleed (iOS rounds the corners)
 *
 * The outputs are committed. Rerun after changing the mark:
 *   node scripts/generate-icons.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const root = process.cwd();

/* The dark theme's tokens (src/app/globals.css): the tile reads on light and
 * dark browser chrome alike, and the dark accent is the brighter green. */
const tile = "#000000";
const ink = "#f5f5f7";
const accent = "#30d158";

const inter = await readFile(
  join(root, "src/assets/fonts/inter-latin-600.woff"),
);

/**
 * One icon. `rounded` for the tab icons; the Apple icon is full bleed.
 * Proportions are of the tile, so the mark is the same at every size.
 */
async function render(size, { rounded = true } = {}) {
  // Tab sizes get bigger letters: at 16 px, half the tile is too thin to
  // read as more than a grey smudge.
  const fontSize = size * (size <= 32 ? 0.55 : 0.5);
  const dot = Math.max(2, Math.round(size * 0.11));

  const element = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: tile,
        borderRadius: rounded ? size * 0.22 : 0,
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "baseline",
          // Optical centre: the dot adds width on the right only, and the
          // line box leaves room for descenders the letters do not have.
          marginLeft: size <= 32 ? 0 : dot * 0.6,
          marginTop: size * 0.06,
        },
      },
      h(
        "span",
        {
          style: {
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize,
            letterSpacing: -fontSize * 0.04,
            color: ink,
            lineHeight: 1,
          },
        },
        "OL",
      ),
      h("span", {
        style: {
          width: dot,
          height: dot,
          marginLeft: size * 0.02,
          borderRadius: dot,
          background: accent,
        },
      }),
    ),
  );

  const response = new ImageResponse(element, {
    width: size,
    height: size,
    fonts: [{ name: "Inter", data: inter, weight: 600, style: "normal" }],
  });
  return Buffer.from(await response.arrayBuffer());
}

/** An .ico holding PNG images, which every current browser reads. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, png } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

const favicon = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, png: await render(size) })),
);

await writeFile(join(root, "src/app/favicon.ico"), ico(favicon));
await writeFile(join(root, "src/app/icon.png"), await render(512));
await writeFile(
  join(root, "src/app/apple-icon.png"),
  await render(180, { rounded: false }),
);

console.log("Wrote src/app/favicon.ico, icon.png and apple-icon.png");
