import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * This project's type and shadow scales are semantic (`text-body`,
 * `shadow-raised`) rather than numeric, and tailwind-merge cannot know that
 * from the class name alone. Left unconfigured it reads `text-body` as a
 * *colour*, finds it conflicts with `text-accent-fg`, and silently drops the
 * colour — which is how every sized button ended up rendering dark text on
 * the green accent.
 *
 * Registering the scales explicitly is the fix. `tests/unit/cn.test.ts` pins
 * it, because the failure mode is invisible: the class list still looks right,
 * it is just missing one entry.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["display", "h1", "h2", "h3", "lead", "body", "small", "label"],
        },
      ],
      shadow: [{ shadow: ["soft", "raised", "floating"] }],
      rounded: [{ rounded: ["control", "card", "hero"] }],
    },
  },
});

/** Conditional classes, with later Tailwind utilities beating earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
