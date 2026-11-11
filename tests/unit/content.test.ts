import { describe, expect, it } from "vitest";

import {
  contentThemes,
  featuredPosts,
  instagram,
  mentoring,
} from "@/data/content";
import { about, facts } from "@/data/about";
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

describe("content", () => {
  it("links to Instagram over https", () => {
    expect(instagram.href).toMatch(/^https:\/\//);
    expect(instagram.handle).toMatch(/^@/);
  });

  it("is translated completely", () => {
    expectComplete(instagram.motto, "instagram.motto");
    expectComplete(instagram.audience, "instagram.audience");
    expectComplete(mentoring.outcome, "mentoring.outcome");
    expectComplete(mentoring.detail, "mentoring.detail");

    for (const theme of contentThemes) {
      expectComplete(theme.title, `${theme.id}.title`);
      expectComplete(theme.description, `${theme.id}.description`);
    }
  });

  it("has unique theme ids", () => {
    const ids = contentThemes.map((theme) => theme.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps the follower count as a number, so it can be formatted", () => {
    // The suffix is separate, so pt-BR can render 30,8K.
    expect(typeof instagram.followers).toBe("number");
    expect(instagram.followers).toBeGreaterThan(0);
  });

  it("links every featured post over https to instagram", () => {
    for (const post of featuredPosts) {
      expect(post.url, post.id).toMatch(
        /^https:\/\/www\.instagram\.com\/(p|reel)\//,
      );
    }
  });

  it("has unique post ids", () => {
    const ids = featuredPosts.map((post) => post.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("carries no tracking parameters on a post URL", () => {
    // The pasted links had ?img_index=1 on them; the index belongs to a
    // viewing session, not to the post.
    for (const post of featuredPosts) {
      expect(post.url, post.id).not.toContain("?");
    }
  });

  it("translates a caption into every language when one is given", () => {
    // Captions are optional — Instagram cannot be read programmatically, so
    // they are written by hand — but a half-translated one is a bug.
    for (const post of featuredPosts) {
      if (post.caption) expectComplete(post.caption, `${post.id}.caption`);
    }
  });
});

describe("about", () => {
  it("is translated completely", () => {
    expectComplete(about.paragraph, "about.paragraph");
    for (const fact of facts) {
      expectComplete(fact.label, `${fact.id}.label`);
      expectComplete(fact.value, `${fact.id}.value`);
    }
  });

  it("has unique fact ids", () => {
    const ids = facts.map((fact) => fact.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("answers the questions a recruiter checks first", () => {
    const ids = facts.map((fact) => fact.id);
    expect(ids).toContain("based");
    expect(ids).toContain("hours");
    expect(ids).toContain("languages");
  });
});
