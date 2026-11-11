import { expect, test } from "@playwright/test";

test.describe("content and community", () => {
  test("leads with the audience and the mentoring outcome", async ({
    page,
  }) => {
    await page.goto("/en");

    const content = page.getByRole("region", {
      name: /explain this work to 30,000 developers/i,
    });
    await content.scrollIntoViewIfNeeded();

    await expect(content.getByText("@otaviolima.dev")).toBeVisible();
    await expect(
      content.getByText(/student teams I mentored won at national/i),
    ).toBeVisible();
  });

  test("names the verified badge for a screen reader", async ({ page }) => {
    await page.goto("/en");

    // A bare checkmark glyph is invisible to assistive technology.
    await expect(page.getByText("Verified account")).toBeAttached();
  });

  test("links the favourite posts straight out, with no embed", async ({
    page,
  }) => {
    await page.goto("/en");

    const content = page.getByRole("region", {
      name: /explain this work to 30,000 developers/i,
    });
    await content.scrollIntoViewIfNeeded();

    const posts = content.getByRole("link", { name: /View on Instagram/i });
    await expect(posts).toHaveCount(3);

    for (const href of await posts.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("href")),
    )) {
      expect(href).toMatch(/^https:\/\/www\.instagram\.com\/p\//);
    }

    // An embed would mean a third-party iframe and its tracking.
    await expect(page.locator("iframe")).toHaveCount(0);
  });

  test("opens outbound links safely in a new tab", async ({ page }) => {
    await page.goto("/en");

    const external = page.locator('a[target="_blank"]');
    const count = await external.count();
    expect(count).toBeGreaterThan(0);

    const rels = await external.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("rel") ?? ""),
    );
    for (const rel of rels) {
      expect(rel).toContain("noreferrer");
    }
  });
});

test.describe("testimonials", () => {
  test("attributes every quote to a named colleague", async ({ page }) => {
    await page.goto("/en");

    const section = page.getByRole("region", {
      name: /what the people i worked with say/i,
    });
    await section.scrollIntoViewIfNeeded();

    const quotes = section.locator("blockquote");
    await expect(quotes).toHaveCount(3);
    for (const name of [
      "Ivan Gasparetto Filho",
      "Gesebel Medeiros",
      "Leonardo Portes",
    ]) {
      await expect(section.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("is translated, not just the chrome", async ({ page }) => {
    await page.goto("/pt-br");

    const section = page.getByRole("region", {
      name: /o que dizem as pessoas com quem trabalhei/i,
    });
    await expect(section.getByText(/sem hesitar/)).toBeVisible();
  });
});

test.describe("about teaser", () => {
  test("answers the practical questions beside the paragraph", async ({
    page,
  }) => {
    await page.goto("/en");

    const about = page.getByRole("region", {
      name: /the short, human version/i,
    });
    await about.scrollIntoViewIfNeeded();

    await expect(about.getByText(/Varginha, Brazil/)).toBeVisible();
    await expect(about.getByText(/GMT-3/)).toBeVisible();
    await expect(about.getByText(/Portuguese \(native\)/)).toBeVisible();
  });

  test("is translated, not just the chrome", async ({ page }) => {
    await page.goto("/pt-br");

    const about = page.getByRole("region", {
      name: /a versão curta e humana/i,
    });
    await expect(about.getByText(/Transformo café em código/)).toBeVisible();
    await expect(about.getByText(/Português \(nativo\)/)).toBeVisible();
  });
});
