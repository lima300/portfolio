import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  featuredProjects,
  findProject,
  labProjects,
  projects,
} from "@/data/projects";
import { parseYearMonth, type Localized } from "@/data/types";
import { locales } from "@/i18n/config";

function expectComplete(value: Localized, where: string) {
  for (const locale of locales) {
    expect(
      value[locale]?.trim().length,
      `${where} [${locale}]`,
    ).toBeGreaterThan(0);
  }
}

describe("projects", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("is translated completely", () => {
    for (const project of projects) {
      expectComplete(project.title, `${project.slug}.title`);
      expectComplete(project.outcome, `${project.slug}.outcome`);
      expectComplete(project.summary, `${project.slug}.summary`);
      expectComplete(project.role, `${project.slug}.role`);
      for (const metric of project.metrics) {
        expectComplete(metric.label, `${project.slug}.metric`);
      }
    }
  });

  it("ends after it starts", () => {
    for (const project of projects) {
      if (!project.end) continue;
      expect(
        parseYearMonth(project.end).getTime(),
        project.slug,
      ).toBeGreaterThan(parseYearMonth(project.start).getTime());
    }
  });

  it("orders featured projects by rank, with no ties", () => {
    const ranks = featuredProjects.map((project) => project.rank);
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
    expect(new Set(ranks).size).toBe(ranks.length);
  });

  it("shows no code or live link for confidential work", () => {
    for (const project of projects) {
      if (!project.confidential) continue;
      expect(project.repo, project.slug).toBeUndefined();
      expect(project.live, project.slug).toBeUndefined();
    }
  });

  it("only ever carries https links", () => {
    for (const project of [...projects, ...labProjects]) {
      for (const url of [project.repo, project.live]) {
        if (url) expect(url).toMatch(/^https:\/\//);
      }
    }
  });

  it("finds a project by slug and nothing by a bad one", () => {
    expect(findProject("design-system-at-scale")?.rank).toBe(3);
    expect(findProject("nope")).toBeUndefined();
  });
});

describe("lab projects", () => {
  it("are translated and carry a stack", () => {
    for (const project of labProjects) {
      expectComplete(project.outcome, project.slug);
      expect(project.stack.length, project.slug).toBeGreaterThan(0);
      expect(project.highlights, project.slug).toHaveLength(3);
      project.highlights.forEach((item, index) =>
        expectComplete(item, `${project.slug}.highlights[${index}]`),
      );
    }
  });

  it("links each one to its public repository", () => {
    for (const project of labProjects) {
      expect(project.repo, project.slug).toMatch(
        /^https:\/\/github\.com\/lima300\//,
      );
    }
  });
});

describe("case studies", () => {
  const file = (locale: string, slug: string) =>
    join(process.cwd(), "src/content/work", locale, `${slug}.mdx`);

  it("has a body in every locale for every project", () => {
    // The page imports the body by path; a missing file is a build-time
    // crash for that one route, so catch it here first.
    for (const project of projects) {
      for (const locale of locales) {
        expect(
          existsSync(file(locale, project.slug)),
          file(locale, project.slug),
        ).toBe(true);
      }
    }
  });

  it("has a three-bullet TL;DR, translated", () => {
    for (const project of projects) {
      expect(project.tldr, project.slug).toHaveLength(3);
      project.tldr.forEach((item, index) =>
        expectComplete(item, `${project.slug}.tldr[${index}]`),
      );
    }
  });

  it("starts article headings at h2, since the page owns the h1", () => {
    for (const project of projects) {
      for (const locale of locales) {
        const body = readFileSync(file(locale, project.slug), "utf8");
        expect(body, `${locale}/${project.slug}`).not.toMatch(/^# /m);
      }
    }
  });
});
