import Link from "next/link";

import { cn } from "@/lib/cn";

/**
 * The "OL" monogram, with the green dot that carries the accent into the nav.
 *
 * Set in the body font rather than drawn as an SVG: the wordmark is two
 * letters, so the variable font already on the page renders it crisply at
 * every size without another asset to download.
 *
 * The letters are *not* hidden from assistive technology, and there is no
 * `aria-label`. WCAG 2.5.3 (Label in Name) requires the accessible name to
 * contain the visible text, so that someone driving the page by voice can say
 * what they see. Hiding "OL" behind a friendlier label breaks that; appending
 * the full name in a visually hidden span satisfies both readings.
 */
export function BrandMark({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-baseline gap-0.5 text-body font-semibold tracking-tight",
        "transition-opacity duration-200 hover:opacity-70",
        className,
      )}
    >
      <span>OL</span>
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-accent transition-transform duration-300 ease-spring group-hover:scale-125"
      />
      <span className="sr-only">, {label}</span>
    </Link>
  );
}
