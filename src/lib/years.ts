/**
 * Fills `{years}` in a piece of copy with the computed years of experience.
 *
 * Copy never spells out the number: "Six years" was written once and went
 * stale on the next anniversary while the hero, which computed it, moved on.
 * Every mention now goes through `getYearsOfExperience()` and this.
 */
export function withYears(text: string, years: number): string {
  return text.replaceAll("{years}", String(years));
}
