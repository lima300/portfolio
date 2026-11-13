"use client";

import { Timer, X } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { useMessages } from "@/i18n/provider";
import {
  OPEN_SUMMARY_EVENT,
  SUMMARY_DIALOG_ID,
  SUMMARY_HASH,
} from "@/lib/recruiter-mode";
import { useModal } from "@/lib/use-modal";

const arrivedForSummary = () => window.location.hash === SUMMARY_HASH;

/**
 * The toggle and the dialog around the recruiter summary. The summary itself
 * is server-rendered and passed in as children, so opening it costs a
 * `showModal()` and nothing else.
 *
 * Opens from the hero button, from a `#summary` link, and from the command
 * palette (which sends `OPEN_SUMMARY_EVENT` when the summary is on the page).
 */
export function RecruiterMode({ children }: { children: ReactNode }) {
  const messages = useMessages();
  const t = messages.recruiter;
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    // Drop the hash, so a reload or a back-navigation does not reopen it.
    if (window.location.hash === SUMMARY_HASH) {
      history.replaceState(
        history.state,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  const dialog = useModal(open, close);

  useEffect(() => {
    const show = () => setOpen(true);
    const onHashChange = () => {
      if (arrivedForSummary()) show();
    };
    window.addEventListener(OPEN_SUMMARY_EVENT, show);
    window.addEventListener("hashchange", onHashChange);
    /*
     * Arriving with #summary — a shared link, or the palette from another
     * page. Checked here rather than in the initial state because effects
     * also re-run when Next re-shows a previously visited page, which keeps
     * its state. A frame later, so the page is painted underneath.
     */
    const frame = arrivedForSummary() ? requestAnimationFrame(show) : 0;
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(OPEN_SUMMARY_EVENT, show);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <Timer aria-hidden className="size-4" />
        {t.open}
      </Button>

      <dialog
        ref={dialog}
        id={SUMMARY_DIALOG_ID}
        aria-labelledby="recruiter-summary-title"
        className="m-0 mx-auto my-[5vh] max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-hero border border-border bg-bg-elevated p-0 text-fg shadow-floating backdrop:bg-bg/70 backdrop:backdrop-blur-xl"
      >
        <div className="relative p-6 md:p-10">
          <IconButton
            aria-label={t.close}
            onClick={() => dialog.current?.close()}
            className="absolute top-4 right-4"
          >
            <X />
          </IconButton>
          {children}
        </div>
      </dialog>
    </>
  );
}
