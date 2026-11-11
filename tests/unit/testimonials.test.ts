import { describe, expect, it } from "vitest";

import { hasTestimonials, testimonials } from "@/data/testimonials";
import type { Localized } from "@/data/types";
import { locales } from "@/i18n/config";

function expectComplete(value: Localized, where: string) {
  for (const locale of locales) {
    expect(
      value[locale]?.trim().length,
      `${where} [${locale}]`,
    ).toBeGreaterThan(0);
  }
}

/**
 * These assertions matter more once the list is populated than they do now.
 * They exist so that whoever pastes the LinkedIn recommendations in cannot
 * accidentally ship a quote with no name against it — an unattributed
 * testimonial is indistinguishable from an invented one.
 */
describe("testimonials", () => {
  it("agrees with its own emptiness flag", () => {
    expect(hasTestimonials).toBe(testimonials.length > 0);
  });

  it("has unique ids", () => {
    const ids = testimonials.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("attributes every quote to a named person at a company", () => {
    for (const item of testimonials) {
      expect(item.name.trim().length, item.id).toBeGreaterThan(0);
      expect(item.company.trim().length, item.id).toBeGreaterThan(0);
      expectComplete(item.role, `${item.id}.role`);
      expectComplete(item.relationship, `${item.id}.relationship`);
    }
  });

  it("provides every quote in both languages", () => {
    for (const item of testimonials) {
      expectComplete(item.quote, `${item.id}.quote`);
    }
  });

  it("carries no surrounding quotation marks in the data", () => {
    // The component adds typographic quotes; doubling them looks broken.
    for (const item of testimonials) {
      for (const locale of locales) {
        expect(item.quote[locale], item.id).not.toMatch(/^["“']/);
      }
    }
  });

  it("only ever links to an https source", () => {
    for (const item of testimonials) {
      if (item.source) expect(item.source).toMatch(/^https:\/\//);
    }
  });
});
