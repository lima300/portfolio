import { describe, expect, it } from "vitest";

import { formatDuration, formatMonth, formatRange } from "@/lib/format-date";

/**
 * Formatting must not read the clock, so that it stays deterministic during
 * prerendering, and must not depend on the machine's time zone — a month
 * label that shifts because the build ran in UTC+13 is a real bug.
 */
describe("formatMonth", () => {
  it("renders month and year per locale", () => {
    expect(formatMonth("2023-03", "en")).toBe("Mar 2023");
    expect(formatMonth("2023-03", "pt-br")).toMatch(/mar/i);
    expect(formatMonth("2023-03", "pt-br")).toContain("2023");
  });

  it("does not shift the month across time zones", () => {
    // January is the dangerous one: a negative offset would roll to December.
    expect(formatMonth("2021-01", "en")).toBe("Jan 2021");
    expect(formatMonth("2021-12", "en")).toBe("Dec 2021");
  });
});

describe("formatRange", () => {
  it("joins two months", () => {
    expect(formatRange("2022-06", "2023-03", "en", "Present")).toBe(
      "Jun 2022 — Mar 2023",
    );
  });

  it("uses the supplied label for an open-ended range", () => {
    expect(formatRange("2023-03", undefined, "en", "Present")).toBe(
      "Mar 2023 — Present",
    );
    expect(formatRange("2023-03", undefined, "pt-br", "Atual")).toContain(
      "Atual",
    );
  });
});

describe("formatDuration", () => {
  const now = new Date("2026-11-10T00:00:00Z");

  it("counts whole years and remaining months inclusively", () => {
    // Jun 2022 to Mar 2023 inclusive is 10 months.
    expect(formatDuration("2022-06", "2023-03", "en", now)).toBe("10 mths");
  });

  it("combines years and months", () => {
    // May 2021 to May 2022 inclusive is 13 months.
    expect(formatDuration("2021-05", "2022-05", "en", now)).toMatch(/1 yr/);
    expect(formatDuration("2021-05", "2022-05", "en", now)).toMatch(/1 mth/);
  });

  it("measures an open range against the supplied instant", () => {
    const result = formatDuration("2023-03", undefined, "en", now);
    expect(result).toMatch(/3 yr/);
  });

  it("omits the months when the span is whole years", () => {
    // Jan 2020 to Dec 2021 inclusive is 24 months.
    expect(formatDuration("2020-01", "2021-12", "en", now)).toBe("2 yrs");
  });
});
