import { expect, test, type Page } from "@playwright/test";

/*
 * Keyboard-first features. Desktop only: a phone has no keyboard to press
 * ⌘K on, and the palette's button is covered by the shell tests.
 */
test.skip(
  ({ isMobile }) => isMobile,
  "keyboard shortcuts are a desktop feature",
);

const MOD = process.platform === "darwin" ? "Meta" : "Control";

/** Navigates, then waits until the keyboard listener is attached. */
async function visit(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute("data-shortcuts", "ready");
}

async function openPalette(page: Page) {
  await page.keyboard.press(`${MOD}+k`);
  const palette = page.getByRole("dialog", { name: "Command palette" });
  await expect(palette).toBeVisible();
  return palette;
}

test.describe("command palette", () => {
  test("opens with ⌘K, focuses the search, and closes on Escape", async ({
    page,
  }) => {
    await visit(page, "/en");
    const palette = await openPalette(page);
    await expect(palette.getByRole("combobox")).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(palette).toBeHidden();
  });

  test("opens from the header button", async ({ page }) => {
    await visit(page, "/en");
    await page.getByRole("button", { name: "Open command palette" }).click();
    await expect(
      page.getByRole("dialog", { name: "Command palette" }),
    ).toBeVisible();
  });

  test("filters, then navigates to a case study", async ({ page }) => {
    await visit(page, "/en");
    const palette = await openPalette(page);
    await palette.getByRole("combobox").fill("design system");
    await expect(palette.getByRole("option")).toHaveCount(1);
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/en\/work\/design-system-at-scale$/);
    await expect(palette).toBeHidden();
  });

  test("switches the theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await visit(page, "/en");
    const palette = await openPalette(page);
    await palette.getByRole("option", { name: "Use the dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("switches the language, keeping the page", async ({ page }) => {
    await visit(page, "/en/about");
    const palette = await openPalette(page);
    await palette.getByRole("option", { name: "Ler em português" }).click();
    await expect(page).toHaveURL(/\/pt-br\/about$/);
  });

  test("copies the email", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await visit(page, "/en");
    const palette = await openPalette(page);
    await palette.getByRole("combobox").fill("email");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toContainText(/copied/i);
  });

  test("is translated", async ({ page }) => {
    await visit(page, "/pt-br");
    await page.keyboard.press(`${MOD}+k`);
    const palette = page.getByRole("dialog", { name: "Paleta de comandos" });
    await expect(
      palette.getByRole("option", { name: "Currículo" }),
    ).toBeVisible();
  });
});

test.describe("keyboard shortcuts", () => {
  test("g then a goes to about", async ({ page }) => {
    await visit(page, "/en");
    await page.keyboard.press("g");
    await page.keyboard.press("a");
    await expect(page).toHaveURL(/\/en\/about$/);
  });

  test("t cycles the theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await visit(page, "/en");
    // System -> Light: the resolved theme is already light, so press twice.
    await page.keyboard.press("t");
    await page.keyboard.press("t");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("? lists every shortcut", async ({ page }) => {
    await visit(page, "/en");
    await page.keyboard.press("?");
    const sheet = page.getByRole("dialog", { name: "Keyboard shortcuts" });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByText("Go to the résumé")).toBeVisible();
    await sheet.getByRole("button", { name: "Close" }).click();
    await expect(sheet).toBeHidden();
  });

  test("stay out of the way while typing", async ({ page }) => {
    await visit(page, "/en");
    const palette = await openPalette(page);
    await palette.getByRole("combobox").pressSequentially("gat");
    await expect(page).toHaveURL(/\/en$/);
    await expect(palette.getByRole("combobox")).toHaveValue("gat");
  });
});

test("one dialog closing does not shut the next one", async ({ page }) => {
  await visit(page, "/en");
  await page.keyboard.press("?");
  await expect(
    page.getByRole("dialog", { name: "Keyboard shortcuts" }),
  ).toBeVisible();
  // No wait in between: the sheet's `close` event lands after ⌘K.
  await page.keyboard.press("Escape");
  await page.keyboard.press(`${MOD}+k`);
  await expect(
    page.getByRole("dialog", { name: "Command palette" }),
  ).toBeVisible();
  await page.waitForTimeout(300);
  await expect(
    page.getByRole("dialog", { name: "Command palette" }),
  ).toBeVisible();
});
