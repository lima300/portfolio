import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  companies,
  findCompany,
  projectsFor,
  type Company,
} from "@/data/companies";
import { featuredProjects } from "@/data/projects";
import { locales } from "@/i18n/config";

describe("company pages", () => {
  it("has at least one company, so the route has something to prerender", () => {
    expect(companies.length).toBeGreaterThan(0);
  });

  it("has unique, lowercase, URL-safe slugs", () => {
    const slugs = companies.map((company) => company.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("orders only case studies that exist, each once", () => {
    const known = new Set(featuredProjects.map((project) => project.slug));
    for (const company of companies) {
      expect(new Set(company.projectOrder).size, company.slug).toBe(
        company.projectOrder.length,
      );
      for (const slug of company.projectOrder) {
        expect(known.has(slug), `${company.slug} → ${slug}`).toBe(true);
      }
    }
  });

  it("has a role and a note in every locale", () => {
    for (const company of companies) {
      for (const locale of locales) {
        expect(company.role[locale]?.trim(), company.slug).toBeTruthy();
        const note = join(
          process.cwd(),
          "src/content/companies",
          locale,
          `${company.slug}.mdx`,
        );
        expect(existsSync(note), note).toBe(true);
      }
    }
  });

  it("finds a company by slug, and nothing else", () => {
    expect(findCompany(companies[0].slug)).toBe(companies[0]);
    expect(findCompany("no-such-company")).toBeUndefined();
  });
});

describe("projectsFor", () => {
  const company = (projectOrder: string[]): Company => ({
    slug: "test",
    name: "Test",
    role: { en: "Role", "pt-br": "Cargo" },
    projectOrder,
  });

  it("puts the chosen order first and keeps every project", () => {
    const last = featuredProjects.at(-1)!.slug;
    const ordered = projectsFor(company([last]));

    expect(ordered[0].slug).toBe(last);
    expect(ordered.map((project) => project.slug).sort()).toEqual(
      featuredProjects.map((project) => project.slug).sort(),
    );
  });

  it("falls back to home order, ignoring unknown slugs", () => {
    expect(projectsFor(company(["missing"]))).toEqual(featuredProjects);
  });
});
