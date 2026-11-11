import { expect, test } from "@playwright/test";

const ROUTES = [
  "/en",
  "/pt-br",
  "/en/work/developer-experience-platform",
  "/pt-br/work/digital-twin-modernisation",
  "/en/about",
  "/en/resume",
  "/pt-br/colophon",
  "/pt-br/lab",
];

/**
 * The browser console is part of the product: a recruiter's engineer friend
 * will open DevTools. Nothing may log an error or a warning.
 *
 * Runs against a production build, but the inline-script warning this guards
 * against is development-only, so `tests/e2e/console.dev.spec.ts` covers the
 * dev server too.
 */
for (const route of ROUTES) {
  test(`${route} logs nothing to the console`, async ({ page }) => {
    const messages: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") {
        messages.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) =>
      messages.push(`pageerror: ${error.message}`),
    );

    await page.goto(route, { waitUntil: "networkidle" });

    // Toggling the theme re-renders the provider subtree, which is when a
    // script rendered by a component would be re-encountered.
    const toggle = page.getByRole("button", {
      name: /colour theme|tema de cores/i,
    });
    await toggle.click();
    await toggle.click();

    expect(messages).toEqual([]);
  });
}
