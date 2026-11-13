import { expect, test } from "@playwright/test";

/*
 * The card → case study morph. Chromium only: the View Transitions API with
 * transition types is what React's <ViewTransition> builds on, and where it
 * is missing the navigation simply happens without one.
 */
test.skip(
  ({ browserName }) => browserName !== "chromium",
  "view transitions are tested in Chromium",
);

test("a project's motif morphs from its card into the case study", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      errors.push(message.text());
    }
  });

  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-shortcuts", "ready");
  // The card's link, not the recruiter summary's (in a closed dialog).
  const link = page
    .getByRole("region", { name: /platforms that stayed fast/i })
    .locator('a[href="/en/work/developer-experience-platform"]');
  await link.first().scrollIntoViewIfNeeded();

  // Record which elements take part in the transition the click starts.
  const pseudos = page.evaluate(
    () =>
      new Promise<string[]>((resolve) => {
        const start = document.startViewTransition.bind(document);
        document.startViewTransition = ((...args: Parameters<typeof start>) => {
          const transition = start(...args);
          transition.ready.then(() =>
            resolve(
              document
                .getAnimations()
                .map((animation) => {
                  const effect = animation.effect as KeyframeEffect | null;
                  return effect?.pseudoElement ?? "";
                })
                .filter(Boolean),
            ),
          );
          return transition;
        }) as typeof document.startViewTransition;
      }),
  );

  await link.first().click();
  expect(await pseudos).toEqual(
    expect.arrayContaining([
      "::view-transition-old(motif-developer-experience-platform)",
      "::view-transition-new(motif-developer-experience-platform)",
    ]),
  );

  await expect(page).toHaveURL(/\/en\/work\/developer-experience-platform$/);
  expect(errors).toEqual([]);
});
