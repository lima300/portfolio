import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentProps<T>;

/** The single definition of the content column: 1200px, 24px gutters. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn("mx-auto w-full max-w-content px-6 md:px-8", className)}
      {...props}
    />
  );
}
