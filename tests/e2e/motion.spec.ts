import { expect, test } from "@playwright/test";

const KITCHEN_SINK = "/en/dev/kitchen-sink";

test.describe("reveal", () => {
  test("content below the fold starts hidden and reveals on scroll", async ({
    page,
  }) => {
    await page.goto(KITCHEN_SINK);

    const reveal = page.locator("[data-reveal]").first();
    await expect(reveal).toHaveAttribute("data-reveal", "hidden");

    await reveal.scrollIntoViewIfNeeded();
    await expect(reveal).toHaveAttribute("data-reveal", "visible");
    await expect(reveal).toHaveCSS("opacity", "1");
  });

  test("content is never left invisible with reduced motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(KITCHEN_SINK);

    // The attribute may still say "hidden" — what matters is that the hidden
    // styles do not apply, because the CSS is gated on the media query.
    const reveal = page.locator("[data-reveal]").first();
    await expect(reveal).toHaveCSS("opacity", "1");

    await context.close();
  });
});

test.describe("count up", () => {
  test("renders the final value before any animation runs", async ({
    page,
  }) => {
    // Server-rendered output must already carry the real number, for search
    // engines and for anyone without JavaScript.
    await page.context().route("**/*.js", (route) => route.abort());
    await page.goto(KITCHEN_SINK, { waitUntil: "domcontentloaded" });

    await expect(page.getByText("100,000+", { exact: true })).toBeVisible();
  });

  test("reaches the target value after counting", async ({ page }) => {
    await page.goto(KITCHEN_SINK);

    const metric = page.getByText("100,000+", { exact: true });
    await metric.scrollIntoViewIfNeeded();
    await expect(metric).toBeVisible({ timeout: 5000 });
  });

  test("skips straight to the value with reduced motion", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(KITCHEN_SINK);

    const metric = page.getByText("60%", { exact: true });
    await metric.scrollIntoViewIfNeeded();
    // No interim zero: the value is correct on the very first check.
    await expect(metric).toHaveText("60%");

    await context.close();
  });
});

/*
 * Tooltips are a pointer-and-keyboard affordance. Radix deliberately
 * suppresses them on touch, where there is no hover to trigger them and no
 * keyboard to dismiss them with — so asserting them on a simulated phone
 * tests the wrong contract.
 */
test.describe("tooltip", () => {
  test.skip(({ isMobile }) => !!isMobile, "no hover or keyboard on touch");

  test("appears on keyboard focus, not just hover", async ({ page }) => {
    await page.goto(KITCHEN_SINK);

    const trigger = page.getByRole("button", { name: "GitHub profile" }).nth(1);

    /*
     * `toPass` retries the focus as well as the assertion. Focusing before
     * hydration completes is a no-op as far as Radix is concerned, and under
     * parallel load that window is wide enough to matter — retrying the
     * assertion alone would just watch a tooltip that was never asked to open.
     */
    await expect(async () => {
      await trigger.focus();
      await expect(page.getByRole("tooltip")).toContainText("GitHub", {
        timeout: 1000,
      });
    }).toPass({ timeout: 15_000 });
  });

  test("dismisses on Escape", async ({ page }) => {
    await page.goto(KITCHEN_SINK);

    const trigger = page.getByRole("button", { name: "GitHub profile" }).nth(1);

    await expect(async () => {
      await trigger.focus();
      await expect(page.getByRole("tooltip")).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15_000 });

    await page.keyboard.press("Escape");
    await expect(page.getByRole("tooltip")).toBeHidden();
  });
});

test.describe("toast", () => {
  test("announces in a live region that already exists", async ({ page }) => {
    await page.goto(KITCHEN_SINK);

    // The region must be in the DOM before the message, or it is not read out.
    const region = page.locator("[aria-live='polite']");
    await expect(region).toBeAttached();
    await expect(region).toBeEmpty();

    await page.getByRole("button", { name: "Success toast" }).click();
    await expect(region).toContainText("Email copied to clipboard");

    // And it clears itself.
    await expect(region).toBeEmpty({ timeout: 6000 });
  });
});
