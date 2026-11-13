import { expect, test } from "@playwright/test";

test.describe("recruiter mode", () => {
  test("opens from the hero with everything needed to act", async ({
    page,
  }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute(
      "data-shortcuts",
      "ready",
    );
    await page.getByRole("button", { name: "The 60-second version" }).click();

    const summary = page.getByRole("dialog", { name: "Otávio Lima" });
    await expect(summary).toBeVisible();
    await expect(
      summary.getByText(/senior frontend engineer · \d+\+ years/i),
    ).toBeVisible();
    await expect(summary.getByText("100,000+", { exact: true })).toBeVisible();
    await expect(
      summary.getByRole("link", { name: /^read the case study:/i }),
    ).toHaveCount(3);
    await expect(summary.getByRole("link", { name: "Résumé" })).toHaveAttribute(
      "href",
      "/en/resume",
    );
    await expect(
      summary.getByRole("button", { name: /copy email/i }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(summary).toBeHidden();
  });

  test("opens on arrival from a #summary link, and forgets the hash", async ({
    page,
  }) => {
    await page.goto("/en#summary");
    const summary = page.getByRole("dialog", { name: "Otávio Lima" });
    await expect(summary).toBeVisible();
    await summary.getByRole("button", { name: "Close the summary" }).click();
    await expect(summary).toBeHidden();
    await expect(page).toHaveURL(/\/en$/);
  });

  test("opens from the command palette on another page", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "the palette is opened by keyboard here");
    await page.goto("/en/about");
    await expect(page.locator("html")).toHaveAttribute(
      "data-shortcuts",
      "ready",
    );
    await page.keyboard.press(
      process.platform === "darwin" ? "Meta+k" : "Control+k",
    );
    await page
      .getByRole("dialog", { name: "Command palette" })
      .getByRole("option", { name: "The 60-second version" })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Otávio Lima" }),
    ).toBeVisible();
  });

  test("is translated", async ({ page }) => {
    await page.goto("/pt-br#summary");
    const summary = page.getByRole("dialog", { name: "Otávio Lima" });
    await expect(summary.getByText("100.000+", { exact: true })).toBeVisible();
    await expect(summary.getByText("Principais projetos")).toBeVisible();
  });
});
