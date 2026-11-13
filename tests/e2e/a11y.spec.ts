import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  "/en",
  "/pt-br",
  // Scanning the design system directly means a violation is caught in the
  // primitive, not once it has been composed into six different pages.
  "/en/dev/kitchen-sink",
  "/en/work/developer-experience-platform",
  "/pt-br/work/design-system-at-scale",
  "/en/about",
  "/pt-br/resume",
  "/en/resume",
  "/en/colophon",
  "/en/lab",
  "/pt-br/uses",
];

/**
 * Waits for entrance animations to finish before scanning.
 *
 * Without this the scan races the page: it once caught a hero word mid-fade
 * at 1.33:1 and reported a contrast violation for a state that lasts 400ms
 * and that no one is expected to read. Transient frames of an entrance are
 * not what WCAG 1.4.3 is about, and a scan that fires at a different moment
 * on every run is not a gate.
 *
 * Only time-driven, finite animations are awaited. The aurora loops forever
 * and the timeline fills on scroll, so their `finished` promises never
 * settle — awaiting those would hang the test rather than stabilise it.
 */
async function settleAnimations(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const pending = document
          .getAnimations()
          .filter((animation) => {
            if (animation.timeline !== document.timeline) return false;
            const timing = animation.effect?.getTiming();
            return timing ? timing.iterations !== Infinity : false;
          })
          .map((animation) => animation.finished.catch(() => undefined));

        // A safety net, so a stalled animation fails the assertion rather
        // than the test runner's global timeout.
        const timeout = new Promise<void>((done) => setTimeout(done, 3000));
        void Promise.race([Promise.all(pending), timeout]).then(() =>
          resolve(),
        );
      }),
  );
}

for (const route of ROUTES) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await settleAnimations(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

/*
 * WebKit only moves focus to links with Tab when the user has enabled
 * "Press Tab to highlight each item on a webpage", which Playwright cannot
 * set. Tab order is therefore asserted on Chromium; VoiceOver on Safari is
 * covered by the manual accessibility pass.
 */
test.describe("keyboard navigation", () => {
  test.skip(
    ({ browserName }) => browserName === "webkit",
    "WebKit does not tab to links by default",
  );

  test("the skip link is the first thing a keyboard user reaches", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });

  test("the focused element shows a visible focus ring", async ({ page }) => {
    await page.goto("/en");
    await page.keyboard.press("Tab");

    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? getComputedStyle(el).outlineWidth : null;
    });

    expect(outline).not.toBe("0px");
  });
});
