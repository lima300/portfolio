/**
 * Conventional Commits, with a scope vocabulary that matches how this repo is
 * organised. The history is part of the portfolio, so it is linted like code.
 *
 * @type {import("@commitlint/types").UserConfig}
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "a11y",
        "i18n",
        "style",
        "refactor",
        "test",
        "docs",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "scope-enum": [
      1,
      "always",
      [
        "app",
        "ui",
        "motion",
        "sections",
        "home",
        "work",
        "lab",
        "about",
        "resume",
        "content",
        "uses",
        "colophon",
        "i18n",
        "theme",
        "seo",
        "data",
        "a11y",
        "perf",
        "deps",
        "ci",
        "repo",
        "tests",
        "unit",
        "e2e",
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "header-max-length": [2, "always", 72],
    "body-max-line-length": [1, "always", 100],
  },
};

export default config;
