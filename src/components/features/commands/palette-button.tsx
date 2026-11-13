"use client";

import { Search } from "lucide-react";

import { Kbd } from "@/components/ui/kbd";
import { useMessages } from "@/i18n/provider";
import { cn } from "@/lib/cn";
import { useIsApple } from "@/lib/use-is-apple";

import { useCommands } from "./commands-provider";

/**
 * The visible way into ⌘K, for everyone who does not know the shortcut.
 *
 * Hovering or focusing it starts fetching the palette, so by the time the
 * click lands the chunk is usually there.
 */
export function PaletteButton({ className }: { className?: string }) {
  const messages = useMessages();
  const { openPalette, preload } = useCommands();
  const isApple = useIsApple();

  return (
    <button
      type="button"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={openPalette}
      onPointerEnter={preload}
      onFocus={preload}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-control text-fg-muted transition-[color,background-color,transform] duration-200 ease-out-expo hover:bg-accent-soft hover:text-accent active:scale-[0.94]",
        "w-9 justify-center md:w-auto md:border md:border-border md:pr-1.5 md:pl-2.5",
        className,
      )}
    >
      <Search aria-hidden className="size-[1.125rem] md:size-4" />
      <span className="sr-only">{messages.commands.open}</span>
      {/*
        Hidden until the platform is known, rather than wrong then right.
        Part of the accessible name, not aria-hidden: a voice-control user
        reads "⌘K" off the button and has to be able to say it.
      */}
      <span
        className={cn(
          "hidden items-center gap-0.5 md:flex",
          isApple === null && "invisible",
        )}
      >
        <Kbd>{isApple === false ? "Ctrl" : "⌘"}</Kbd>
        <Kbd>K</Kbd>
      </span>
    </button>
  );
}
