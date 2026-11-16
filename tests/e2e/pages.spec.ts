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

test.describe("lab", () => {
  test("opens from the selected work section", async ({ page }) => {
    await page.goto("/en");
    const work = page.getByRole("region", {
      name: /platforms that stayed fast/i,
    });
    await work.getByRole("link", { name: /side projects in the lab/i }).click();

    await expect(page).toHaveURL(/\/en\/lab$/);
    await expect(
      page.getByRole("heading", { level: 2, name: "Zeno's Paradox" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Barber Time" }),
    ).toBeVisible();
  });

  test("links every project to its code, named per project", async ({
    page,
  }) => {
    await page.goto("/en/lab");

    for (const [name, repo] of [
      ["Zeno's Paradox", "achilles-torroise-paradox"],
      ["Barber Time", "barber-time"],
    ]) {
      const link = page.getByRole("link", { name: `Code: ${name}` });
      await expect(link).toHaveAttribute(
        "href",
        `https://github.com/lima300/${repo}`,
      );
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }
  });

  test("is translated", async ({ page }) => {
    await page.goto("/pt-br/lab");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /coisas menores, feitas para aprender algo/i,
      }),
    ).toBeVisible();
  });
});

test.describe("uses", () => {
  test("opens from the footer and lists the setup", async ({ page }) => {
    await page.goto("/en");
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Setup" })
      .click();

    await expect(page).toHaveURL(/\/en\/uses$/);
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: /the desk the work/i }),
    ).toBeVisible();
    await expect(main.getByText("Keychron K2")).toBeVisible();
  });

  test("is translated", async ({ page }) => {
    await page.goto("/pt-br/uses");
    await expect(
      page.getByRole("heading", { level: 2, name: "Teclados e mouse" }),
    ).toBeVisible();
  });
});

test.describe("content", () => {
  test("is the nav's destination and opens from the home section", async ({
    page,
  }) => {
    await page.goto("/en");
    // By href, not role: on a phone the nav sits in the closed menu, out of
    // the accessibility tree until it opens.
    await expect(
      page.getByRole("banner").locator('a[href="/en/content"]').first(),
    ).toBeAttached();

    const section = page.getByRole("region", {
      name: /explain this work to 30,000 developers/i,
    });
    await section.scrollIntoViewIfNeeded();
    await section
      .getByRole("link", { name: /everything on content & community/i })
      .click();

    await expect(page).toHaveURL(/\/en\/content$/);
    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: /explain this work to 30,000 developers/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    // On its own page, each block heads its own part of the outline.
    await expect(
      main.getByRole("heading", { level: 2, name: "Mentoring" }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: /view on instagram/i }),
    ).toHaveCount(3);
  });

  test("is translated", async ({ page }) => {
    await page.goto("/pt-br/content");
    await expect(
      page.getByRole("heading", { level: 2, name: "Sobre o que é" }),
    ).toBeVisible();
  });
});

test.describe("company pages", () => {
  test("open with the company, reorder the work and stay out of search", async ({
    page,
  }) => {
    await page.goto("/en/for/example");

    await expect(
      page.getByRole("heading", { level: 1, name: /hi, example co\./i }),
    ).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );

    // The draft banner stays until the placeholder copy is replaced.
    await expect(page.getByRole("note")).toContainText(/draft/i);

    const work = page.getByRole("region", { name: /most relevant work/i });
    const titles = work.getByRole("heading", { level: 3 });
    await expect(titles).toHaveCount(3);
    await expect(titles.first()).toHaveText(
      "A design system for 100,000+ users",
    );
    await expect(titles.nth(1)).toHaveText("Developer Experience Platform");
  });

  test("are translated", async ({ page }) => {
    await page.goto("/pt-br/for/example");
    await expect(
      page.getByRole("heading", { level: 2, name: /por que a example co\./i }),
    ).toBeVisible();
  });

  test("return 404 for a company that does not exist", async ({ page }) => {
    const response = await page.goto("/en/for/no-such-company");
    expect(response?.status()).toBe(404);
  });
});
