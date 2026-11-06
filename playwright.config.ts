import { defineConfig, devices } from "@playwright/test";

/*
 * Two targets, one at a time.
 *
 * `prod` (default) runs the real suite against a production build — that is
 * the artefact that ships, and dev-mode overlays would pollute the
 * accessibility scan.
 *
 * `dev` runs the `*.dev.spec.ts` files against `next dev`, because React's
 * diagnostic warnings (hydration mismatches, invalid nesting, scripts
 * rendered by components) exist only in its development build.
 *
 * They are separate runs rather than two webServers because Next allows a
 * single dev server per directory: starting one here would collide with the
 * `pnpm dev` you already have open.
 */
const isDev = process.env.E2E_TARGET === "dev";

const PORT = isDev ? 3101 : 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",

  use: {
    baseURL,
    trace: "on-first-retry",
  },

  projects: isDev
    ? [
        {
          name: "dev-server",
          use: { ...devices["Desktop Chrome"] },
          testMatch: "**/*.dev.spec.ts",
        },
      ]
    : [
        {
          name: "desktop-chromium",
          use: { ...devices["Desktop Chrome"] },
          testIgnore: "**/*.dev.spec.ts",
        },
        {
          name: "mobile-safari",
          use: { ...devices["iPhone 14"] },
          testIgnore: "**/*.dev.spec.ts",
        },
      ],

  webServer: {
    command: isDev
      ? `pnpm exec next dev --port ${PORT}`
      : `pnpm build && pnpm exec next start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
