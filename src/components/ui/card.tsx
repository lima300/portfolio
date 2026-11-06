import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export const cardStyles = cva("relative", {
  variants: {
    variant: {
      /** Frosted — for anything floating over content. */
      glass: "rounded-card border glass",
      /** The default surface for grouped content. */
      elevated: "rounded-card border bg-bg-elevated shadow-soft",
      /** Quiet, for dense grids where many cards sit side by side. */
      sunken: "rounded-card border bg-bg-sunken",
      /**
       * Large product card. Lifts on hover, which reads as "this is a link"
       * before you notice the cursor.
       */
      product: [
        "overflow-hidden rounded-hero border bg-bg-elevated shadow-soft",
        "transition-[transform,box-shadow] duration-500 ease-out-expo",
        "hover:-translate-y-1 hover:shadow-floating",
      ],
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8 md:p-10",
    },
  },
  defaultVariants: { variant: "elevated", padding: "md" },
});

export type CardProps = ComponentProps<"div"> & VariantProps<typeof cardStyles>;

export function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div
      className={cn(cardStyles({ variant, padding }), className)}
      {...props}
    />
  );
}
