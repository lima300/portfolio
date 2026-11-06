import { describe, expect, it } from "vitest";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/**
 * These are regression tests for a silent failure.
 *
 * tailwind-merge resolves each class to exactly one conflict group. The
 * project's scales are semantic (`text-body`, `shadow-raised`), so without
 * explicit registration it reads them as colours and drops the real colour
 * from the list — producing a plausible-looking class string that renders the
 * wrong thing. The accessibility scan caught it on a button; these catch it
 * at the source.
 */

describe("cn", () => {
  it("keeps a text colour alongside a font size", () => {
    const result = cn("text-accent-fg", "text-body");
    expect(result).toContain("text-accent-fg");
    expect(result).toContain("text-body");
  });

  it("keeps a text colour alongside every step of the type scale", () => {
    const sizes = [
      "text-display",
      "text-h1",
      "text-h2",
      "text-h3",
      "text-lead",
      "text-body",
      "text-small",
      "text-label",
    ];

    for (const size of sizes) {
      const result = cn("text-fg-muted", size);
      expect(result, size).toContain("text-fg-muted");
      expect(result, size).toContain(size);
    }
  });

  it("keeps a shadow alongside a background colour", () => {
    const result = cn("bg-accent", "shadow-soft");
    expect(result).toContain("bg-accent");
    expect(result).toContain("shadow-soft");
  });

  it("still resolves genuine conflicts, last one winning", () => {
    expect(cn("text-body", "text-small")).toBe("text-small");
    expect(cn("text-fg", "text-accent")).toBe("text-accent");
    expect(cn("shadow-soft", "shadow-floating")).toBe("shadow-floating");
    expect(cn("rounded-control", "rounded-hero")).toBe("rounded-hero");
    expect(cn("bg-bg", "bg-bg-elevated")).toBe("bg-bg-elevated");
  });

  it("lets a caller override a component's own classes", () => {
    expect(cn("px-5 text-small", "text-label")).toBe("px-5 text-label");
  });
});

describe("buttonStyles", () => {
  it("pairs the accent background with its own foreground at every size", () => {
    for (const size of ["sm", "md", "lg"] as const) {
      const classes = buttonStyles({ variant: "primary", size });
      expect(classes, size).toContain("bg-accent");
      expect(classes, size).toContain("text-accent-fg");
    }
  });

  it("survives cn() with a caller-supplied class", () => {
    const classes = cn(
      buttonStyles({ variant: "primary", size: "lg" }),
      "w-full",
    );
    // The regression: text-accent-fg used to vanish here, leaving --fg text
    // on the green accent at 3.06:1.
    expect(classes).toContain("text-accent-fg");
    expect(classes).toContain("bg-accent");
    expect(classes).toContain("w-full");
  });
});
