import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export const iconButtonStyles = cva(
  [
    "inline-flex items-center justify-center rounded-control",
    "transition-[color,background-color,transform] duration-200 ease-out-expo",
    "active:scale-[0.94]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        ghost: "text-fg-muted hover:bg-accent-soft hover:text-accent",
        outline:
          "border border-border-strong text-fg-muted hover:border-accent hover:text-accent",
      },
      size: {
        sm: "size-8 [&_svg]:size-4",
        md: "size-9 [&_svg]:size-[1.125rem]",
        lg: "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

/**
 * An icon-only control. `aria-label` is required rather than optional: an
 * unlabelled icon button is invisible to a screen reader, and TypeScript is a
 * cheaper place to catch that than an audit.
 */
export type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> &
  VariantProps<typeof iconButtonStyles> & { "aria-label": string };

export function IconButton({
  className,
  variant,
  size,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(iconButtonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
