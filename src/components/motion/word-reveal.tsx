import { Fragment, type CSSProperties, type ElementType } from "react";

import { cn } from "@/lib/cn";

type WordRevealProps = {
  /** Plain text. Each word gets its own mask, so markup is not supported. */
  text: string;
  /** Milliseconds between words. */
  step?: number;
  /** Offset before the first word, to let the page settle first. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Raises a headline into place one word at a time.
 *
 * A Server Component: the stagger is just a per-word `animation-delay`, so
 * this ships no JavaScript at all. It animates on load rather than on scroll
 * because the only place it is used is above the fold.
 *
 * The spaces sit *between* the masks, never inside them. A trailing space
 * inside an `overflow: hidden` inline-block is collapsed away by the layout
 * engine, which runs the words together into "Frontendthatscales".
 *
 * The words stay real text nodes with no `aria-hidden` and no duplicated copy
 * for screen readers, so the heading's text content is the plain sentence.
 * Splitting to the *word* is safe for that — it is letter-level splitting
 * that makes VoiceOver spell things out.
 */
export function WordReveal({
  text,
  step = 70,
  delay = 80,
  as: Component = "span",
  className,
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <Component className={cn(className)}>
      {words.map((word, index) => (
        // The word is the content; the index disambiguates repeats.
        <Fragment key={`${word}-${index}`}>
          <span
            data-word=""
            style={
              { "--word-delay": `${delay + index * step}ms` } as CSSProperties
            }
          >
            <span>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Component>
  );
}
