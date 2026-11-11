import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  // The dev server negotiates HMR for the origin it was opened on. Playwright
  // drives it over 127.0.0.1, which would otherwise fail the handshake.
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

/*
 * MDX carries the long-form prose of each case study and nothing else. The
 * facts a page is built from — title, outcome, metrics, stack — stay in
 * `src/data/projects.ts`, so the home cards and the case study pages cannot
 * disagree. See docs/adr/0005-mdx-prose-typed-facts.md.
 *
 * Plugins are named by string: Turbopack hands them to Rust, which cannot
 * receive a JavaScript function.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
