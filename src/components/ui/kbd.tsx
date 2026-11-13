import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** One key, drawn as a keycap. */
export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[0.375rem] border border-border bg-bg-sunken px-1 font-mono text-[0.6875rem] leading-none font-medium text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
