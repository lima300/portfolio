"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  /** Names the frame for assistive technology, and the button that loads it. */
  title: string;
  labels: { load: string };
  className?: string;
};

/**
 * A live demo, loaded on request.
 *
 * Starts as a button in a frame of the same size, so nothing shifts when the
 * demo arrives. Nothing is fetched until the visitor asks: an iframe on load
 * would cost every visitor a second application's JavaScript for a demo most
 * will not run, and would count against this page's own performance budget.
 *
 * Sandboxed to what a client-rendered demo needs. `allow-same-origin` is
 * safe here because the demo is served from its own origin, not this one.
 */
export function LiveEmbed({ src, title, labels, className }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-control border bg-bg-sunken",
        className,
      )}
    >
      {loaded ? (
        <iframe
          src={src}
          title={title}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex items-center justify-center"
        >
          <span
            className={cn(
              buttonStyles({ variant: "secondary", size: "sm" }),
              "transition-transform duration-200 group-hover:scale-[1.03]",
            )}
          >
            <Play aria-hidden className="size-4" />
            {labels.load}
            <span className="sr-only">: {title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
