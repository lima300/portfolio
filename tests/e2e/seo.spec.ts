import { expect, test, type Page } from "@playwright/test";

/*
 * What a crawler or a link preview reads. None of it is visible on the page,
 * so none of it would be caught by the other suites if it broke.
 *
 * Request-level checks only — no layout — so one browser is enough.
 */
test.skip(
  ({ browserName }) => browserName !== "chromium",
  "Head tags and routes do not depend on the browser.",
);

const PAGES = [
  "/en",
  "/pt-br/about",
  "/en/resume",
  "/pt-br/lab",
  "/en/content",
  "/en/uses",
  "/pt-br/colophon",
  "/en/work/developer-experience-platform",
  "/pt-br/work/design-system-at-scale",
];

const meta = (page: Page, key: string) =>
  page
    .locator(`meta[property="${key}"], meta[name="${key}"]`)
    .first()
    .getAttribute("content");

test.describe("link previews", () => {
  for (const path of PAGES) {
    test(`${path} has a complete preview and a working image`, async ({
      page,
      request,
    }) => {
      await page.goto(path);

      const locale = path.startsWith("/pt-br") ? "pt_BR" : "en_US";
      expect(await meta(page, "og:locale")).toBe(locale);
      expect(await meta(page, "og:url")).toMatch(new RegExp(`${path}$`));
      expect(await meta(page, "og:title")).toMatch(/Otávio Lima/);
      expect(await meta(page, "og:description")).toBeTruthy();
      expect(await meta(page, "twitter:card")).toBe("summary_large_image");
      expect(await meta(page, "og:image:alt")).toMatch(/Otávio Lima/);

      // The image URL is absolute, on the production host; fetch it locally.
      const image = new URL((await meta(page, "og:image"))!);
      expect(image.pathname).toBe(`${path}/opengraph-image/card`);
      const response = await request.get(image.pathname);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toBe("image/png");
    });
  }

  test("each page pairs its translations", async ({ page }) => {
    await page.goto("/pt-br/work/design-system-at-scale");

    const href = (lang: string) =>
      page
        .locator(`link[rel="alternate"][hreflang="${lang}"]`)
        .getAttribute("href");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/pt-br\/work\/design-system-at-scale$/,
    );
    expect(await href("en")).toMatch(/\/en\/work\/design-system-at-scale$/);
    expect(await href("pt-BR")).toMatch(
      /\/pt-br\/work\/design-system-at-scale$/,
    );
    expect(await href("x-default")).toMatch(
      /\/en\/work\/design-system-at-scale$/,
    );
  });
});

test.describe("structured data", () => {
  async function graph(page: Page, path: string) {
    await page.goto(path);
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    return JSON.parse(raw!) as Record<string, unknown>;
  }

  test("home describes the site and the person", async ({ page }) => {
    const data = await graph(page, "/pt-br");
    const nodes = data["@graph"] as Record<string, unknown>[];
    const person = nodes.find((node) => node["@type"] === "Person")!;

    expect(nodes.map((node) => node["@type"])).toEqual(["WebSite", "Person"]);
    expect(person.name).toBe("Otávio Lima");
    expect(person.jobTitle).toBe("Engenheiro Frontend Sênior");
    expect(person.sameAs).toContain("https://github.com/lima300");
  });

  test("about is a profile page about the same person", async ({ page }) => {
    const data = await graph(page, "/en/about");
    const [profile, person] = data["@graph"] as Record<string, unknown>[];

    expect(profile["@type"]).toBe("ProfilePage");
    expect(profile.mainEntity).toEqual({ "@id": person["@id"] });
  });

  test("a case study is an article by that person", async ({ page }) => {
    const data = await graph(page, "/en/work/digital-twin-modernisation");

    expect(data["@type"]).toBe("Article");
    expect(data.headline).toBe(
      "Modernising an enterprise digital-twin platform",
    );
    expect(data.inLanguage).toBe("en");
    expect((data.author as Record<string, unknown>)["@id"]).toMatch(/#person$/);
  });
});

test.describe("crawling", () => {
  test("the sitemap lists every page in both languages", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();

    for (const path of PAGES) {
      expect(xml).toContain(`${path}</loc>`);
    }
    expect(xml).toContain('hreflang="pt-BR"');
    expect(xml).not.toContain("/dev/");
    // Company pages are unlisted: sent by hand, never offered to a crawler.
    expect(xml).not.toContain("/for/");
  });

  test("robots allows the site, hides /dev and points at the sitemap", async ({
    request,
  }) => {
    const text = await (await request.get("/robots.txt")).text();

    expect(text).toContain("Allow: /");
    expect(text).toContain("Disallow: /en/dev/");
    expect(text).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
  });
});
