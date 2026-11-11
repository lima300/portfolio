import { expect, test } from "@playwright/test";

test.describe("case study", () => {
  test("opens from its card on the home page", async ({ page }) => {
    await page.goto("/en");

    const card = page
      .getByRole("listitem")
      .filter({ hasText: "Developer Experience Platform" })
      .first();
    await card.scrollIntoViewIfNeeded();
    await card.getByRole("link", { name: "Case study" }).click();

    await expect(page).toHaveURL(/\/en\/work\/developer-experience-platform$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Developer Experience Platform",
      }),
    ).toBeVisible();
  });

  test("leads with a TL;DR and the figures from the same record as the card", async ({
    page,
  }) => {
    await page.goto("/en/work/digital-twin-modernisation");

    const tldr = page.getByRole("region", { name: "TL;DR" });
    await expect(tldr.getByRole("listitem")).toHaveCount(3);
    await expect(tldr.getByText("60%", { exact: true })).toBeVisible();

    // Client work keeps its confidentiality note on the page as well.
    await expect(
      page.getByText(/code and screenshots withheld/i),
    ).toBeVisible();
  });

  test("renders the MDX body, decision log included", async ({ page }) => {
    await page.goto("/en/work/design-system-at-scale");

    const article = page.getByRole("article");
    await expect(
      article.getByRole("heading", {
        level: 2,
        name: "Decisions and trade-offs",
      }),
    ).toBeVisible();
    await expect(
      article.getByText("StencilJS", { exact: true }).first(),
    ).toBeVisible();
    // Exactly one h1 on the page: the MDX starts at h2.
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("is translated, body and chrome", async ({ page }) => {
    await page.goto("/pt-br/work/developer-experience-platform");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Plataforma de Experiência do Desenvolvedor",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Decisões e trade-offs" }),
    ).toBeVisible();
    await expect(page.getByText("em vez de").first()).toBeVisible();
  });

  test("links on to the next case study, wrapping at the end", async ({
    page,
  }) => {
    await page.goto("/en/work/design-system-at-scale");

    const next = page.getByRole("navigation", { name: "Next case study" });
    await next.scrollIntoViewIfNeeded();
    await next.getByRole("link").click();

    await expect(page).toHaveURL(/\/en\/work\/developer-experience-platform$/);
  });

  test("declares hreflang alternates for the same case study", async ({
    page,
  }) => {
    await page.goto("/en/work/developer-experience-platform");

    await expect(
      page.locator('link[rel="alternate"][hreflang="pt-BR"]'),
    ).toHaveAttribute("href", /\/pt-br\/work\/developer-experience-platform$/);
  });

  test("returns 404 for a slug that does not exist", async ({ page }) => {
    const response = await page.goto("/en/work/not-a-real-project");
    expect(response?.status()).toBe(404);
  });
});
