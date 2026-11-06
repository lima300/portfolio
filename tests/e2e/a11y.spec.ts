import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES = ["/en", "/pt-br"];

for (const route of ROUTES) {
  test(`${route} has no accessibility violations`, async ({ page }) => {
    await page.goto(route);

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
