/**
 * WCAG 2.2 relative luminance and contrast, plus enough colour parsing to
 * handle the formats the design tokens actually use (`#rgb`, `#rrggbb`,
 * `rgb(r g b / a)`).
 *
 * This exists so contrast is a test rather than a promise: see
 * `tests/unit/contrast.test.ts`, which reads the real tokens out of
 * `globals.css` and checks every text/background pair in both themes.
 */

export type Rgba = { r: number; g: number; b: number; a: number };

export function parseColor(value: string): Rgba {
  const input = value.trim();

  const hex = /^#([0-9a-f]{3,8})$/i.exec(input);
  if (hex) {
    const digits = hex[1];
    const expand = (d: string) =>
      d.length <= 4
        ? d
            .split("")
            .map((c) => c + c)
            .join("")
        : d;
    const full = expand(digits);
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
      a: full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1,
    };
  }

  // rgb(0 0 0 / 0.08) and the legacy rgba(0, 0, 0, 0.08)
  const rgb = /^rgba?\(([^)]+)\)$/i.exec(input);
  if (rgb) {
    const parts = rgb[1].split("/");
    const channels = parts[0]
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    const alphaSource = parts[1] ?? (channels.length > 3 ? channels[3] : 1);
    const alpha = Number(alphaSource);

    if (channels.length < 3 || channels.slice(0, 3).some(Number.isNaN)) {
      throw new Error(`Unsupported colour: ${value}`);
    }

    return {
      r: channels[0],
      g: channels[1],
      b: channels[2],
      a: Number.isNaN(alpha) ? 1 : alpha,
    };
  }

  throw new Error(`Unsupported colour: ${value}`);
}

/** Flattens a translucent colour onto an opaque backdrop. */
export function composite(foreground: Rgba, backdrop: Rgba): Rgba {
  const blend = (f: number, b: number) =>
    Math.round(f * foreground.a + b * (1 - foreground.a));

  return {
    r: blend(foreground.r, backdrop.r),
    g: blend(foreground.g, backdrop.g),
    b: blend(foreground.b, backdrop.b),
    a: 1,
  };
}

/** WCAG 2.x relative luminance. */
export function relativeLuminance({ r, g, b }: Rgba): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/**
 * Contrast ratio between two colours, 1–21.
 *
 * Translucent inputs are composited onto `backdrop` first, so a hairline
 * border or a frosted surface is measured as it actually renders.
 */
export function contrastRatio(
  foreground: string,
  background: string,
  backdrop = "#ffffff",
): number {
  const base = composite(parseColor(background), parseColor(backdrop));
  const text = composite(parseColor(foreground), base);

  const [lighter, darker] = [
    relativeLuminance(text),
    relativeLuminance(base),
  ].sort((a, b) => b - a);

  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG 2.2 AA thresholds. */
export const AA = {
  /** Body text below 24px, or below 19px bold. */
  text: 4.5,
  /** Text at 24px+, or 19px+ bold. */
  largeText: 3,
  /** Non-text: control boundaries, icons, focus rings. */
  nonText: 3,
} as const;
