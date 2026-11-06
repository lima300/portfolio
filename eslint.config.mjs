import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      /*
       * Accessibility is a build gate, not a review suggestion.
       * eslint-config-next already registers the jsx-a11y plugin, so take the
       * strict ruleset's rules without re-declaring the plugin.
       */
      ...jsxA11y.flatConfigs.strict.rules,

      // The repo is a portfolio piece: unused code is noise, not a warning.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      // `<html lang>` is set from the route locale, so the rule can't see it.
      "jsx-a11y/lang": "off",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
