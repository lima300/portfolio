import { expect, test } from "@playwright/test";

test.describe("hero", () => {
  test("the headline reads as one sentence to a crawler", async ({ page }) => {
    await page.goto("/en");

    // Word-by-word masks must not change what the heading says.
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Frontend that scales. Interfaces that feel effortless.",
    );
  });

  test("words keep their spacing despite the clipping masks", async ({
    page,
  }) => {
    await page.goto("/en");

    /*
     * A space *inside* an overflow:hidden inline-block is collapsed away,
     * which runs the words together into "Frontendthatscales". Measure the
     * real gap — but only between two words that share a line, since the
     * headline wraps at narrow widths.
     */
    const gap = await page.evaluate(() => {
      const words = Array.from(
        document.querySelectorAll("h1 [data-word]"),
      ) as HTMLElement[];

      for (let i = 0; i < words.length - 1; i += 1) {
        const a = words[i].getBoundingClientRect();
        const b = words[i + 1].getBoundingClientRect();
        if (Math.abs(a.top - b.top) < 2) return b.left - a.right;
      }
      return null;
    });

    expect(gap, "no two words share a line").not.toBeNull();
    expect(gap!).toBeGreaterThan(3);
  });

  test("the headline is visible with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/en");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // The rise animation carries its own start state, so with the rule
    // switched off every word must sit at full opacity already.
    const opacities = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1 [data-word] > span")).map(
        (node) => getComputedStyle(node).opacity,
      ),
    );
    expect(opacities.every((value) => value === "1")).toBe(true);

    await context.close();
  });

  test("states the years of experience, derived not hard-coded", async ({
    page,
  }) => {
    await page.goto("/en");

    // 2019-03 is the first role, so this grows on its own.
    const expected =
      new Date().getUTCFullYear() -
      2019 -
      (new Date().getUTCMonth() + 1 < 3 ? 1 : 0);

    await expect(
      page.getByText(
        new RegExp(`Senior Frontend Engineer, ${expected}\\+ years`),
      ),
    ).toBeVisible();
  });
});

test.describe("aurora", () => {
  test("is hidden from assistive technology", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("[data-aurora]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  test("stops animating once it scrolls out of view", async ({ page }) => {
    await page.goto("/en");

    const aurora = page.locator("[data-aurora]");
    await expect(aurora).toHaveAttribute("data-visible", "true");

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(aurora).toHaveAttribute("data-visible", "false");

    // And the CSS actually responds to the flag.
    const running = await page.evaluate(() => {
      const blob = document.querySelector("[data-aurora] > span");
      return blob ? getComputedStyle(blob).animationName : null;
    });
    expect(running).toBe("none");
  });

  test("never animates with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/en");

    const running = await page.evaluate(() => {
      const blob = document.querySelector("[data-aurora] > span");
      return blob ? getComputedStyle(blob).animationName : null;
    });
    expect(running).toBe("none");

    await context.close();
  });
});

test.describe("impact strip", () => {
  test("shows all four metrics with their real values", async ({ page }) => {
    await page.goto("/en");

    const strip = page.getByRole("region", {
      name: /what that work actually moved/i,
    });
    await strip.scrollIntoViewIfNeeded();

    for (const value of ["60%", "6", "100+", "100,000+"]) {
      await expect(strip.getByText(value, { exact: true })).toBeVisible();
    }
  });

  test("formats numbers for the active locale", async ({ page }) => {
    // pt-BR groups thousands with a dot, not a comma.
    await page.goto("/pt-br");

    // Scoped: the recruiter summary repeats the figure in a closed dialog.
    const strip = page.getByRole("region", {
      name: /o que esse trabalho de fato mudou/i,
    });
    await strip.scrollIntoViewIfNeeded();
    await expect(strip.getByText("100.000+", { exact: true })).toBeVisible();
  });
});
