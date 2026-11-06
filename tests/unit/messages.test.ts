import { describe, expect, it } from "vitest";

import { locales } from "@/i18n/config";
import en from "@/messages/en";
import ptBr from "@/messages/pt-br";

type Node = Record<string, unknown>;

function flatten(value: Node, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof child === "object" && child !== null
      ? flatten(child as Node, path)
      : [path];
  });
}

const catalogues = { en, "pt-br": ptBr } as const;

describe("message catalogues", () => {
  it("covers every configured locale", () => {
    expect(Object.keys(catalogues).sort()).toEqual([...locales].sort());
  });

  it("has identical key sets across locales", () => {
    const reference = flatten(en as unknown as Node).sort();
    for (const [locale, catalogue] of Object.entries(catalogues)) {
      expect(flatten(catalogue as unknown as Node).sort(), locale).toEqual(
        reference,
      );
    }
  });

  it("has no empty strings", () => {
    for (const [locale, catalogue] of Object.entries(catalogues)) {
      const empty = flatten(catalogue as unknown as Node).filter((path) => {
        const value = path
          .split(".")
          .reduce<unknown>(
            (node, key) => (node as Node)?.[key],
            catalogue as unknown,
          );
        return typeof value !== "string" || value.trim().length === 0;
      });
      expect(empty, locale).toEqual([]);
    }
  });
});
