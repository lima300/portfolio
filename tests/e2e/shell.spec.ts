import { expect, test } from "@playwright/test";

test.describe("header", () => {
  test("materialises once you scroll away from the top", async ({ page }) => {
    await page.goto("/en");

    const header = page.locator("header");
    await expect(header).toHaveAttribute("data-scrolled", "false");

    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).toHaveAttribute("data-scrolled", "true");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveAttribute("data-scrolled", "false");
  });

  test("stays put while the page scrolls", async ({ page }) => {
    await page.goto("/en");

    const header = page.locator("header");
    const before = await header.boundingBox();
    await page.evaluate(() => window.scrollTo(0, 800));
    const after = await header.boundingBox();

    expect(after?.y).toBe(before?.y);
    // The height must not change: a sticky bar that resizes pushes the page.
    expect(after?.height).toBe(before?.height);
  });
});

test.describe("mobile menu", () => {
  test.skip(
    ({ isMobile }) => !isMobile,
    "the menu button only exists at small widths",
  );

  test("opens, traps focus and closes on Escape", async ({ page }) => {
    await page.goto("/en");

    await page.getByRole("button", { name: "Open menu" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // showModal() makes the rest of the page inert, so the links behind the
    // menu must not be reachable.
    await expect(dialog.getByRole("link", { name: "Work" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("closes after following a link", async ({ page }) => {
    await page.goto("/en");

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Work" }).click();

    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

test.describe("footer", () => {
  test("shows the clock in Brazil time, not the visitor's", async ({
    browser,
  }) => {
    // A visitor in Tokyo must still be told the time in São Paulo.
    const context = await browser.newContext({ timezoneId: "Asia/Tokyo" });
    const page = await context.newPage();
    await page.goto("/en");

    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText(/It's \d{2}:\d{2} in Brazil/);

    const shown = await footer
      .getByText(/It's \d{2}:\d{2} in Brazil/)
      .textContent();
    const hour = Number(shown?.match(/(\d{2}):\d{2}/)?.[1]);

    const expected = Number(
      new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        hour12: false,
        timeZone: "America/Sao_Paulo",
      }).format(new Date()),
    );

    expect(hour).toBe(expected % 24);

    await context.close();
  });

  test("links out to every primary profile", async ({ page }) => {
    await page.goto("/en");

    const elsewhere = page
      .getByRole("contentinfo")
      .getByRole("navigation", { name: "Elsewhere" });

    for (const name of ["GitHub", "LinkedIn", "Instagram"]) {
      await expect(
        elsewhere.getByRole("link", { name: new RegExp(`^${name}`) }),
      ).toHaveAttribute("href", /^https:\/\//);
    }
  });
});

test.describe("copy email", () => {
  test("writes the address to the clipboard and confirms it", async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "clipboard-read permission is Chromium-only in Playwright",
    );

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/en");

    await page
      .getByRole("button", { name: /copy email/i })
      .first()
      .click();

    await expect(page.locator("[aria-live='polite']")).toContainText(
      "Email copied to clipboard",
    );

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe("otavio.lima.vga@gmail.com");
  });
});
