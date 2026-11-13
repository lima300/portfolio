"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button, buttonStyles } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";
import { useIsApple } from "@/lib/use-is-apple";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Stage = "idle" | "beaming" | "gone";

/** Long enough for the beam to open and the address to rise into the ship. */
const BEAM_DURATION = 1300;

/**
 * The 404's one joke: a UFO — this is Varginha's site, after all — hovering
 * over the broken address, waiting to be asked to take it away.
 *
 * Every step is a real control: a button starts the abduction, and once the
 * address is gone, focus moves to the links that replace it, so a keyboard or
 * screen-reader visitor is never left on a control that no longer exists.
 * With reduced motion the stages still happen, just without the travel.
 */
export function UfoAbduction() {
  const { locale, messages } = useI18n();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isApple = useIsApple();
  const [stage, setStage] = useState<Stage>("idle");
  const result = useRef<HTMLParagraphElement>(null);
  const t = messages.notFound;

  useEffect(() => {
    if (stage !== "beaming") return;
    const timer = setTimeout(
      () => setStage("gone"),
      reducedMotion ? 0 : BEAM_DURATION,
    );
    return () => clearTimeout(timer);
  }, [reducedMotion, stage]);

  useEffect(() => {
    if (stage !== "gone") return;
    // A frame later: the button that had focus has just been hidden, and
    // the browser's focus fixup for it must not undo this.
    const frame = requestAnimationFrame(() => result.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [stage]);

  const [before, after] = t.paletteHint.split("{shortcut}");

  const gone = stage === "gone";

  return (
    <div
      data-ufo-stage={stage}
      className="flex flex-col items-center gap-10 text-center"
    >
      <div aria-hidden className="flex flex-col items-center">
        <svg viewBox="0 0 160 70" className="ufo-ship w-40" focusable="false">
          {/* Dome */}
          <path
            d="M54 36a26 24 0 0 1 52 0z"
            className="fill-accent-soft stroke-accent"
            strokeWidth="1.5"
          />
          {/* Saucer: mid-greys, so it reads as metal in either theme. */}
          <ellipse cx="80" cy="42" rx="74" ry="15" className="fill-fg-subtle" />
          <ellipse cx="80" cy="37" rx="62" ry="8" className="fill-fg-muted" />
          {[22, 51, 80, 109, 138].map((cx, index) => (
            <circle
              key={cx}
              cx={cx}
              cy="45"
              r="3.5"
              className="ufo-light fill-accent"
              style={{ animationDelay: `${index * 180}ms` }}
            />
          ))}
        </svg>
        <div className="ufo-beam" />
      </div>

      {/*
        Before and after share one grid cell, so the page keeps its height
        when one replaces the other. Once used, the "before" side stays as an
        `invisible` spacer, out of the tab order and the accessibility tree.
      */}
      <div className="-mt-10 grid place-items-center *:[grid-area:1/1]">
        <div
          className={cn(
            "flex flex-col items-center gap-8",
            gone && "invisible",
          )}
        >
          <code
            aria-hidden
            className="ufo-address max-w-[min(20rem,80vw)] truncate rounded-control border border-border bg-bg-elevated px-3 py-1.5 font-mono text-small text-fg-muted shadow-soft"
          >
            {pathname}
          </code>
          {/* The address, for a screen reader: the chip is decorative. */}
          <p className="sr-only">
            {t.brokenLabel}: {pathname}
          </p>
          <Button
            size="lg"
            // Not `disabled` while beaming: disabling the focused control
            // drops focus to <body> before the hand-off below can happen.
            onClick={() =>
              setStage((current) => (current === "idle" ? "beaming" : current))
            }
            aria-disabled={stage !== "idle" || undefined}
            className="ufo-action"
          >
            {t.abduct}
          </Button>
        </div>

        {/* Mounted only once it is needed, then handed focus. */}
        {gone ? (
          <div className="ufo-result flex flex-col items-center gap-6">
            <p
              ref={result}
              tabIndex={-1}
              className="text-lead text-fg outline-none"
            >
              {t.abducted}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={routes.home(locale)}
                className={cn(buttonStyles({ size: "lg" }))}
              >
                {t.home}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link
                href={routes.work(locale)}
                className={cn(
                  buttonStyles({ variant: "secondary", size: "lg" }),
                )}
              >
                {t.work}
              </Link>
              <Link
                href={routes.about(locale)}
                className={cn(buttonStyles({ variant: "ghost", size: "lg" }))}
              >
                {t.about}
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {/* A keyboard hint, so not on phones — and not until the key is known. */}
      {isApple === null ? null : (
        <p className="hidden text-small text-fg-subtle md:block">
          {before}
          <Kbd>{isApple ? "⌘K" : "Ctrl K"}</Kbd>
          {after}
        </p>
      )}
    </div>
  );
}
