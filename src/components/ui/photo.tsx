import Image from "next/image";

import type { Photo } from "@/data/photos";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type Props = {
  photo: Photo;
  locale: Locale;
  /** The `sizes` attribute: how wide the photo is drawn, per breakpoint. */
  sizes: string;
  /**
   * Above the fold on some viewport: fetch now, at high priority, instead of
   * lazily. Next 16 replaced `priority` with this split, and recommends it
   * over `preload` for an image that is in the HTML anyway.
   */
  eager?: boolean;
  className?: string;
};

/**
 * One photograph, at its 4:5 ratio, with its caption if it has one.
 *
 * The frame reserves the space before the image arrives and the blur
 * placeholder fills it, so a slow connection sees the photo sharpen rather
 * than the page jump.
 */
export function PhotoFigure({ photo, locale, sizes, eager, className }: Props) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <Image
        src={photo.src}
        alt={photo.alt[locale]}
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="aspect-4/5 w-full rounded-card border object-cover"
      />
      {photo.caption ? (
        <figcaption className="font-mono text-label tracking-widest text-fg-subtle uppercase">
          {photo.caption[locale]}
        </figcaption>
      ) : null}
    </figure>
  );
}
