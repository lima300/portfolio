import { expect, test } from "@playwright/test";

test.describe("theming", () => {
  test("follows the OS preference with no manual choice", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/en");

    const background = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(background).toBe("rgb(0, 0, 0)");

    await context.close();
  });

  test("an explicit light choice overrides a dark OS preference", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/en");

    // System -> Light
    await page.getByRole("button", { name: /colour theme/i }).click();

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    const background = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(background).toBe("rgb(251, 251, 253)");

    await context.close();
  });

  test("the choice survives a reload with no flash of the wrong theme", async ({
    page,
  }) => {
    await page.goto("/en");

    // System -> Light -> Dark
    const toggle = page.getByRole("button", { name: /colour theme/i });
    await toggle.click();
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
