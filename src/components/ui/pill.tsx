import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

const pillStyles = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-label font-medium",
  {
    variants: {
      variant: {
        accent: "bg-accent-soft text-accent",
        neutral: "bg-bg-sunken text-fg-muted",
        outline: "border border-border text-fg-muted",
      },
    },
    defaultVariants: { variant: "accent" },
  },
);

export type PillProps = ComponentProps<"span"> &
  VariantProps<typeof pillStyles> & {
    /** Shows a leading status dot, which pulses unless motion is reduced. */
    dot?: boolean;
  };

export function Pill({
  className,
  variant,
  dot,
  children,
  ...props
}: PillProps) {
  return (
    <span className={cn(pillStyles({ variant }), className)} {...props}>
      {dot ? (
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      ) : null}
      {children}
    </span>
  );
}
