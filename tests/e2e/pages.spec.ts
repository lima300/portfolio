import { expect, test } from "@playwright/test";

test.describe("résumé", () => {
  test("opens from the hero and lists every role", async ({ page }) => {
    await page.goto("/en");
    // Scoped to <main>: the nav carries a "Résumé" link of its own.
    await page
      .getByRole("main")
      .getByRole("link", { name: "Résumé", exact: true })
      .click();

    await expect(page).toHaveURL(/\/en\/resume$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Otávio Lima" }),
    ).toBeVisible();

    const experience = page.getByRole("region", { name: "Experience" });
    for (const company of [
      "Bentley Systems",
      "SYDLE",
      "YouX Group",
      "Emakers Jr",
    ]) {
      await expect(
        experience
          .getByRole("heading", { level: 3, name: new RegExp(company) })
          .first(),
      ).toBeVisible();
    }
  });

  test("prints without the site chrome or the print button", async ({
    page,
  }) => {
    await page.goto("/en/resume");
    await expect(
      page.getByRole("button", { name: /print or save as pdf/i }),
    ).toBeVisible();

    await page.emulateMedia({ media: "print" });

    await expect(page.getByRole("banner")).toBeHidden();
    await expect(page.getByRole("contentinfo")).toBeHidden();
    await expect(
      page.getByRole("button", { name: /print or save as pdf/i }),
    ).toBeHidden();
    // The content itself is what remains.
    await expect(
      page.getByRole("region", { name: "Experience" }),
    ).toBeVisible();
  });

  test("prints on white even in the dark theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/en/resume");
    await page.emulateMedia({ media: "print", colorScheme: "dark" });

    const background = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(background).toBe("rgb(255, 255, 255)");
  });

  test("is translated", async ({ page }) => {
    await page.goto("/pt-br/resume");
    await expect(
      page.getByRole("region", { name: "Experiência" }),
    ).toBeVisible();
    await expect(
      page.getByText("Engenheiro Frontend Sênior").first(),
    ).toBeVisible();
  });
});

test.describe("about", () => {
  test("opens from the teaser on the home page", async ({ page }) => {
    await page.goto("/en");
    const teaser = page.getByRole("region", {
      name: /the short, human version/i,
    });
    await teaser.scrollIntoViewIfNeeded();
    await teaser.getByRole("link", { name: /more about me/i }).click();

    await expect(page).toHaveURL(/\/en\/about$/);
    // The URL changes before the new page commits; wait for its heading.
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /engineer, teacher, runner/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    // Next keeps the previous page mounted but hidden after a client-side
    // navigation, so scope to the visible <main> rather than the document.
    await expect(page.getByRole("main").getByText(/GMT-3, with/)).toBeVisible();
  });

  test("carries the career and the references", async ({ page }) => {
    await page.goto("/en/about");

    await expect(
      page.getByRole("region", { name: /what the people i worked with say/i }),
    ).toHaveCount(1);
    await expect(
      page.getByRole("region", { name: /\d+\+ years, mostly spent/i }),
    ).toHaveCount(1);
  });
});

test.describe("colophon", () => {
  test("opens from the footer and links its decisions", async ({ page }) => {
    await page.goto("/en");
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: /how this site was built/i })
      .click();

    await expect(page).toHaveURL(/\/en\/colophon$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /how this site is built/i }),
    ).toBeVisible();

    const adrLinks = page.getByRole("article").locator('a[href*="/docs/adr/"]');
    await expect(adrLinks.first()).toBeVisible();
    for (const rel of await adrLinks.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("rel")),
    )) {
      expect(rel).toContain("noreferrer");
    }
  });

  test("is translated", async ({ page }) => {
    await page.goto("/pt-br/colophon");
    await expect(
      page.getByRole("heading", { level: 2, name: "A stack" }),
    ).toBeVisible();
  });
});
