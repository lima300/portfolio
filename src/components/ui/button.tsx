import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Exported so a `<Link>` can wear the same clothes without this component
 * needing a polymorphic `as` prop or a Slot dependency:
 *
 *   <Link href="/work" className={buttonStyles({ variant: "primary" })}>
 */
export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-control font-medium",
    // Only transform and colour animate, and `active:` gives the press its
    // weight. Both are cheap enough to stay on the compositor.
    "transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out-expo",
    "active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg shadow-soft hover:bg-accent-hover",
        secondary:
          "border border-border-strong bg-bg-elevated text-fg hover:bg-bg-sunken",
        ghost: "text-fg-muted hover:bg-accent-soft hover:text-accent",
      },
      size: {
        sm: "h-9 px-3.5 text-label",
        md: "h-11 px-5 text-small",
        lg: "h-13 px-7 text-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
