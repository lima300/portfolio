import { expect, test } from "@playwright/test";

/**
 * Runs against `next dev`, because React's development build is the only one
 * that emits its diagnostic warnings — hydration mismatches, invalid DOM
 * nesting, and the "Encountered a script tag while rendering React component"
 * warning that the pre-paint theme script would otherwise trigger. A clean
 * console in production proves nothing about any of them.
 *
 * The journey below is not arbitrary. On a hard load React reuses the
 * server-rendered DOM, so a script rendered by a component passes unnoticed;
 * it is the *soft* navigation that makes React build the element on the client
 * and warn. Any version of this test that only loads a page and clicks a
 * button silently passes while the bug is present.
 */

/** Dev-tooling chatter, not application output. */
const IGNORED = [/Download the React DevTools/i, /\[Fast Refresh\]/i];

type Journey = { name: string; from: string; to: RegExp; link: string };

const JOURNEYS: Journey[] = [
  { name: "/en → /pt-br", from: "/en", to: /\/pt-br$/, link: "Português" },
  { name: "/pt-br → /en", from: "/pt-br", to: /\/en$/, link: "English" },
];

for (const journey of JOURNEYS) {
  test(`${journey.name} logs nothing in development`, async ({ page }) => {
    const messages: string[] = [];

    const record = (text: string) => {
      if (!IGNORED.some((pattern) => pattern.test(text))) messages.push(text);
    };

    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") {
        record(`${message.type()}: ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => record(`pageerror: ${error.message}`));

    await page.goto(journey.from, { waitUntil: "networkidle" });

    // Theme switching re-renders the provider subtree.
    const toggle = page.getByRole("button", {
      name: /colour theme|tema de cores/i,
    });
    await toggle.click();
    await toggle.click();

    // The soft navigation: React renders the layout tree on the client.
    await page.getByRole("link", { name: journey.link }).click();
    await page.waitForURL(journey.to);
    await page.waitForTimeout(500);

    // And back, through the history stack.
    await page.goBack();
    await page.waitForTimeout(500);

    expect(messages).toEqual([]);
  });
}
