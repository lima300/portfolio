import { ViewTransition, type ReactNode } from "react";

/**
 * Names a project's motif so it morphs between pages: from its card on the
 * home page, or the "next case study" card, into the case study's header.
 *
 * Navigations are transitions, so React pairs the two elements with the same
 * name and the browser animates one into the other — no layout measuring, no
 * animation library. `default="none"` keeps the motif still during every
 * other transition (a theme switch, say), and `share` must then be explicit
 * or the pair stops morphing. Browsers without the API simply navigate.
 */
export function SharedMotif({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <ViewTransition name={`motif-${slug}`} share="motif-morph" default="none">
      {children}
    </ViewTransition>
  );
}
