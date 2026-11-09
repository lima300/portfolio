import { describe, expect, it } from "vitest";

import { education, experience, yearsOfExperience } from "@/data/experience";
import { headlineMetrics, secondaryMetrics } from "@/data/metrics";
import { skillGroups } from "@/data/skills";
import { sameAs, socials } from "@/data/socials";
import { parseYearMonth, type Localized } from "@/data/types";
import { locales } from "@/i18n/config";

/**
 * The CV is the one thing on this site that must not be wrong, and it is the
 * one thing no compiler can check the *content* of. These tests cover what is
 * checkable: that every language is present, that nothing is blank, and that
 * the dates form a coherent history.
 */

/** Every locale present, and no empty strings in any of them. */
function expectComplete(
  value: Localized<string | readonly string[]>,
  where: string,
) {
  for (const locale of locales) {
    const text = value[locale];
    expect(text, `${where} [${locale}]`).toBeDefined();

    const parts = Array.isArray(text) ? text : [text as string];
    expect(parts.length, `${where} [${locale}] is empty`).toBeGreaterThan(0);
    for (const part of parts) {
      expect(part.trim().length, `${where} [${locale}]`).toBeGreaterThan(0);
    }
  }
}

describe("experience", () => {
  it("has a unique id per role", () => {
    const ids = experience.map((role) => role.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("is translated completely", () => {
    for (const role of experience) {
      expectComplete(role.title, `${role.id}.title`);
      expectComplete(role.location, `${role.id}.location`);
      expectComplete(role.summary, `${role.id}.summary`);
      expectComplete(role.highlights, `${role.id}.highlights`);
    }
  });

  it("keeps the same number of highlights in every language", () => {
    for (const role of experience) {
      const counts = locales.map((locale) => role.highlights[locale].length);
      expect(new Set(counts).size, role.id).toBe(1);
    }
  });

  it("ends every role after it starts", () => {
    for (const role of experience) {
      if (!role.end) continue;
      expect(parseYearMonth(role.end).getTime(), role.id).toBeGreaterThan(
        parseYearMonth(role.start).getTime(),
      );
    }
  });

  it("is ordered most recent first", () => {
    const starts = experience.map((role) =>
      parseYearMonth(role.start).getTime(),
    );
    const sorted = [...starts].sort((a, b) => b - a);
    expect(starts).toEqual(sorted);
  });

  it("has exactly one current role", () => {
    expect(experience.filter((role) => !role.end)).toHaveLength(1);
  });

  it("names a stack for every role", () => {
    for (const role of experience) {
      expect(role.stack.length, role.id).toBeGreaterThan(0);
    }
  });

  it("derives years of experience from the earliest role", () => {
    // The first role began 2019-03.
    expect(yearsOfExperience(new Date("2025-03-15T00:00:00Z"))).toBe(6);
    expect(yearsOfExperience(new Date("2026-11-06T00:00:00Z"))).toBe(7);
  });
});

describe("education", () => {
  it("is translated and coherent", () => {
    for (const entry of education) {
      expectComplete(entry.degree, entry.institution);
      expectComplete(entry.detail, entry.institution);
      expect(parseYearMonth(entry.end).getTime()).toBeGreaterThan(
        parseYearMonth(entry.start).getTime(),
      );
    }
  });
});

describe("metrics", () => {
  const all = [...headlineMetrics, ...secondaryMetrics];

  it("has unique ids", () => {
    const ids = all.map((metric) => metric.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("is translated completely", () => {
    for (const metric of all) {
      expectComplete(metric.label, `${metric.id}.label`);
      expectComplete(metric.detail, `${metric.id}.detail`);
    }
  });

  it("has a finite, non-negative value", () => {
    for (const metric of all) {
      expect(Number.isFinite(metric.value), metric.id).toBe(true);
      expect(metric.value, metric.id).toBeGreaterThanOrEqual(0);
    }
  });

  it("declares decimals wherever the value has them", () => {
    for (const metric of all) {
      if (!Number.isInteger(metric.value)) {
        expect(metric.decimals, `${metric.id} needs decimals`).toBeGreaterThan(
          0,
        );
      }
    }
  });

  it("shows four numbers in the impact strip", () => {
    // The grid is built for four; a fifth would wrap awkwardly.
    expect(headlineMetrics).toHaveLength(4);
  });
});

describe("skills", () => {
  it("has unique ids and is translated", () => {
    const ids = skillGroups.map((group) => group.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const group of skillGroups) {
      expectComplete(group.title, `${group.id}.title`);
      expectComplete(group.statement, `${group.id}.statement`);
      expect(group.items.length, group.id).toBeGreaterThan(0);
    }
  });

  it("names no skill twice across groups", () => {
    const items = skillGroups.flatMap((group) => group.items);
    const duplicates = items.filter(
      (item, index) => items.indexOf(item) !== index,
    );
    expect(duplicates).toEqual([]);
  });
});

describe("socials", () => {
  it("has unique ids and https profile URLs", () => {
    const ids = socials.map((social) => social.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const social of socials) {
      expect(social.href, social.id).toMatch(/^https:\/\//);
      expectComplete(social.note, `${social.id}.note`);
    }
  });

  it("exposes every profile for the Person schema", () => {
    expect(sameAs).toEqual(socials.map((social) => social.href));
  });
});
