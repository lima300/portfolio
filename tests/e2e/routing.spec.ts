import { expect, test } from "@playwright/test";

test.describe("locale routing", () => {
  test("redirects a locale-less URL using Accept-Language", async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: "pt-BR" });
    const page = await context.newPage();

    await page.goto("/");
    await expect(page).toHaveURL(/\/pt-br$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");

    await context.close();
  });

  test("defaults to English for an unsupported language", async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: "ja-JP" });
    const page = await context.newPage();

    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await context.close();
  });

  test("the language switch keeps you on the same page", async ({ page }) => {
    await page.goto("/en");

    await page.getByRole("link", { name: "Português" }).click();
    await expect(page).toHaveURL(/\/pt-br$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Frontend que escala/ }),
    ).toBeVisible();
  });

  test("declares hreflang alternates for both locales", async ({ page }) => {
    await page.goto("/en");

    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="alternate"][hreflang="pt-BR"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('link[rel="alternate"][hreflang="x-default"]'),
    ).toHaveCount(1);
  });
});
