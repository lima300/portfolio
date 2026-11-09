import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Small label above the title. Decorative: it is not part of the heading. */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Defaults to h2; pass h1 for the one top-level heading on a page. */
  as?: "h1" | "h2" | "h3";
  /**
   * Lets the enclosing `<section>` point at this heading with
   * `aria-labelledby`, turning it into a named landmark a screen-reader user
   * can jump straight to.
   */
  headingId?: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  headingId,
  align = "start",
  className,
}: SectionHeadingProps) {
  const sizes = { h1: "text-h1", h2: "text-h2", h3: "text-h3" } as const;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-label tracking-widest text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}

      <Heading
        id={headingId}
        className={cn(sizes[Heading], "text-balance-tight")}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            "measure text-lead text-fg-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
