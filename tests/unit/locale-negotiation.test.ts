import { describe, expect, it } from "vitest";

import { isLocale, negotiateLocale } from "@/i18n/config";

describe("negotiateLocale", () => {
  it("falls back to English when no header is sent", () => {
    expect(negotiateLocale(null)).toBe("en");
    expect(negotiateLocale("")).toBe("en");
  });

  it("matches Brazilian Portuguese and its regional variants", () => {
    expect(negotiateLocale("pt-BR,pt;q=0.9")).toBe("pt-br");
    expect(negotiateLocale("pt")).toBe("pt-br");
    expect(negotiateLocale("pt-PT")).toBe("pt-br");
  });

  it("matches English variants", () => {
    expect(negotiateLocale("en-US,en;q=0.9")).toBe("en");
    expect(negotiateLocale("en-GB")).toBe("en");
  });

  it("honours quality values over listing order", () => {
    expect(negotiateLocale("en;q=0.2,pt-BR;q=0.9")).toBe("pt-br");
    expect(negotiateLocale("pt-BR;q=0.3,en-US;q=0.8")).toBe("en");
  });

  it("skips unsupported languages before falling back", () => {
    expect(negotiateLocale("de-DE,de;q=0.9,pt-BR;q=0.5")).toBe("pt-br");
    expect(negotiateLocale("ja,ko;q=0.8")).toBe("en");
  });

  it("treats a wildcard as the default", () => {
    expect(negotiateLocale("*")).toBe("en");
  });

  it("ignores malformed quality values instead of throwing", () => {
    expect(negotiateLocale("pt-BR;q=abc,en")).toBe("en");
  });
});

describe("isLocale", () => {
  it("accepts only the configured locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt-br")).toBe(true);
    expect(isLocale("pt-BR")).toBe(false);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
