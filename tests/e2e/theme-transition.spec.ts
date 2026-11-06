import { expect, test } from "@playwright/test";

test.describe("theme switch animation", () => {
  test("runs a view transition and cleans up after itself", async ({
    page,
  }) => {
    await page.goto("/en");

    const supported = await page.evaluate(
      () => typeof document.startViewTransition === "function",
    );
    test.skip(!supported, "View Transitions API not available");

    const html = page.locator("html");
    await page.getByRole("button", { name: /colour theme/i }).click();

    // The theme lands...
    await expect(html).toHaveAttribute("data-theme", "light");

    // ...and the transition flag is removed, so a later navigation does not
    // inherit a theme-reveal animation.
    await expect(html).not.toHaveAttribute("data-theme-switching", /.*/);

    // The reveal origin is set from the button's position, not a default.
    const originX = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue("--theme-origin-x"),
    );
    expect(originX).toMatch(/^\d+(\.\d+)?px$/);
  });

  test("switches instantly with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/en");

    await page.getByRole("button", { name: /colour theme/i }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    // No transition was started, so no flag and no origin were ever written.
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-theme-switching",
      /.*/,
    );

    await context.close();
  });
});
