import { cacheLife } from "next/cache";

/**
 * The current year, for the footer.
 *
 * Cache Components rejects `new Date()` during prerendering because the value
 * can drift between renders. `"use cache"` pins it into the prerendered output
 * instead, and `cacheLife("days")` lets it roll over without a redeploy.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getUTCFullYear();
}
