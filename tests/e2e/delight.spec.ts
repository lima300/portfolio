import { expect, test } from "@playwright/test";

test.describe("404", () => {
  test("an unknown path gets the UFO, in the site's layout, with a 404", async ({
    page,
  }) => {
    const response = await page.goto("/en/this/does/not/exist");
    expect(response?.status()).toBe(404);

    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { level: 1, name: /nothing here but a ufo/i }),
    ).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page).toHaveTitle(/page not found/i);
  });

  test("an unknown case study gets the same page", async ({ page }) => {
    const response = await page.goto("/en/work/not-a-real-project");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: /nothing here but a ufo/i }),
    ).toBeVisible();
  });

  test("the abduction is keyboard operable and hands focus on", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/nowhere");
    const main = page.getByRole("main");
    await expect(main.getByText("/en/nowhere").first()).toBeAttached();

    const button = main.getByRole("button", { name: "Beam it up" });
    await button.focus();
    await page.keyboard.press("Enter");

    await expect(main.getByText(/taken\. somewhere real/i)).toBeFocused();
    await main.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/en\/about$/);
  });

  test("is translated", async ({ page }) => {
    await page.goto("/pt-br/lugar-nenhum");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /nada aqui além de um ovni/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Abduzir" })).toBeVisible();
  });
});

test.describe("small delights", () => {
  test("greets whoever opens DevTools", async ({ page }) => {
    const logs: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "log") logs.push(message.text());
    });
    await page.goto("/en", { waitUntil: "networkidle" });
    await expect.poll(() => logs.join("\n")).toContain("Varginha");
    expect(logs.filter((log) => log.includes("Varginha"))).toHaveLength(1);
  });

  test("swaps the title while the tab is hidden, and restores it", async ({
    page,
  }) => {
    await page.goto("/en/about");
    await expect(page).toHaveTitle(/about/i);
    const original = await page.title();

    const setHidden = (hidden: boolean) =>
      page.evaluate((value) => {
        Object.defineProperty(document, "hidden", {
          configurable: true,
          get: () => value,
        });
        document.dispatchEvent(new Event("visibilitychange"));
      }, hidden);

    await setHidden(true);
    await expect(page).toHaveTitle("☕ Coffee break? Come back!");
    await setHidden(false);
    await expect(page).toHaveTitle(original);
  });
});
