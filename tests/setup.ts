import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

/*
 * jsdom has no IntersectionObserver. The reveal and count-up primitives assume
 * it (see src/lib/use-in-view.ts), so give them an inert one: tests that care
 * about visibility drive it through the real browser in tests/e2e.
 */
class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = Object.freeze([0]);
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);
