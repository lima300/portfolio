import { expect, test } from "@playwright/test";

test.describe("selected work", () => {
  test("leads each card with its outcome and key figures", async ({ page }) => {
    await page.goto("/en");

    const work = page.getByRole("region", {
      name: /platforms that stayed fast/i,
    });
    await work.scrollIntoViewIfNeeded();

    await expect(
      work.getByRole("heading", { name: "Developer Experience Platform" }),
    ).toBeVisible();
    await expect(
      work.getByText("60% faster, and the architecture became"),
    ).toBeVisible();

    // Three cards, one list item each.
    await expect(
      work
        .getByRole("listitem")
        .filter({ has: page.getByRole("heading", { level: 3 }) }),
    ).toHaveCount(3);
  });

  test("withholds code and live links for client work", async ({ page }) => {
    await page.goto("/en");

    const card = page
      .getByRole("listitem")
      .filter({ hasText: "Modernising an enterprise digital-twin platform" })
      .first();
    await card.scrollIntoViewIfNeeded();

    await expect(
      card.getByText(/code and screenshots withheld/i),
    ).toBeVisible();
    await expect(card.getByRole("link", { name: "Code" })).toHaveCount(0);
    await expect(card.getByRole("link", { name: "Live" })).toHaveCount(0);
  });

  test("never renders a link without an href", async ({ page }) => {
    await page.goto("/en");

    // The live and repo URLs are deliberately absent until they are published;
    // the cards must omit the links rather than render dead ones.
    const empty = await page.evaluate(
      () =>
        Array.from(document.querySelectorAll("a")).filter((a) => {
          const href = a.getAttribute("href");
          return !href || href === "#" || href === "undefined";
        }).length,
    );
    expect(empty).toBe(0);
  });

  test("renders the architecture motif as decoration, not content", async ({
    page,
  }) => {
    await page.goto("/en");

    const motifs = page.locator("svg[aria-hidden='true']");
    expect(await motifs.count()).toBeGreaterThanOrEqual(3);
  });
});

test.describe("experience timeline", () => {
  test("states the same career length as the hero", async ({ page }) => {
    await page.goto("/en");

    const hero = await page
      .getByText(/Senior Frontend Engineer, \d+\+ years/)
      .textContent();
    const years = hero?.match(/(\d+)\+ years/)?.[1];
    expect(years).toBeTruthy();

    await expect(
      page.getByRole("heading", {
        level: 2,
        name: new RegExp(`^${years}\\+ years, mostly spent`),
      }),
    ).toBeVisible();
  });

  test("lists every role, newest first, as an ordered list", async ({
    page,
  }) => {
    await page.goto("/en");

    const timeline = page.getByRole("region", {
      name: /\d+\+ years, mostly spent/i,
    });
    await timeline.scrollIntoViewIfNeeded();

    const headings = timeline.getByRole("heading", { level: 3 });
    const titles = await headings.allTextContents();

    expect(titles[0]).toContain("Bentley Systems");
    expect(titles.at(-1)).toContain("Education");
  });

  test("marks the current role as present, in the active language", async ({
    page,
  }) => {
    // The same range appears on the project card, so scope to the timeline.
    await page.goto("/en");
    await expect(
      page.locator("#experience").getByText("Mar 2023 — Present"),
    ).toBeVisible();

    await page.goto("/pt-br");
    await expect(
      page.locator("#experience").getByText(/mar.* de 2023 — Atual/),
    ).toBeVisible();
  });

  test("fills a scroll-linked progress line where supported", async ({
    page,
  }) => {
    await page.goto("/en");

    const state = await page.evaluate(() => {
      const element = document.querySelector("[data-timeline-progress]");
      if (!element) return null;
      const style = getComputedStyle(element);
      return {
        supported: CSS.supports("animation-timeline", "view()"),
        display: style.display,
        animation: style.animationName,
      };
    });

    expect(state).not.toBeNull();

    if (state!.supported) {
      // Scroll-driven, so there is no scroll listener to assert on — what
      // matters is that the animation is attached to a view() timeline.
      expect(state!.display).toBe("block");
      expect(state!.animation).toBe("timeline-fill");
    } else {
      // Firefox and friends: the muted rule stands alone, which is fine.
      expect(state!.display).toBe("none");
    }
  });

  test("hides the progress overlay with reduced motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/en");

    const display = await page.evaluate(() => {
      const element = document.querySelector("[data-timeline-progress]");
      return element ? getComputedStyle(element).display : null;
    });
    expect(display).toBe("none");

    await context.close();
  });

  test("shows education with the institution and result", async ({ page }) => {
    await page.goto("/en");

    const timeline = page.getByRole("region", {
      name: /\d+\+ years, mostly spent/i,
    });
    await expect(
      timeline.getByText(/Federal University of Lavras.*GPA 92\/100/),
    ).toBeVisible();
  });
});

test.describe("skills", () => {
  test("leads each group with a sentence, not just names", async ({ page }) => {
    await page.goto("/en");

    const skills = page.getByRole("region", { name: /what i reach for/i });
    await skills.scrollIntoViewIfNeeded();

    await expect(skills.getByRole("heading", { name: "Core" })).toBeVisible();
    await expect(
      skills.getByText(/typed React applications that stay fast/),
    ).toBeVisible();
  });

  test("carries no progress bars or meters", async ({ page }) => {
    await page.goto("/en");

    // A self-assigned proficiency percentage is not information.
    await expect(page.getByRole("progressbar")).toHaveCount(0);
    await expect(page.getByRole("meter")).toHaveCount(0);
  });
});
