"use client";

import { useEffect } from "react";

import { useMessages } from "@/i18n/provider";
import { site } from "@/lib/site";

/** Once per page load, however many times React mounts this. */
let greeted = false;

const ART = String.raw`
   ___  _
  / _ \| |
 | (_) | |__
  \___/|____|
`;

/**
 * Two small things with no UI of their own.
 *
 * A note in the DevTools console, for the engineer a recruiter forwards the
 * link to. And a different tab title while the tab is in the background,
 * put back as soon as it is visible again — unless the page changed its own
 * title in the meantime, which wins.
 */
export function Delights() {
  const messages = useMessages();
  const { awayTitle, console: note } = messages.delight;

  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      `%c${ART}%c\n${note.greeting}\n\n%c${note.body}\n${site.repo}\n\n${note.cta}`,
      "color:#16a34a;font-family:monospace;font-weight:700;line-height:1.1",
      "color:#16a34a;font-size:14px;font-weight:600",
      "font-size:12px;line-height:1.5",
    );
  }, [note]);

  useEffect(() => {
    let saved: string | null = null;

    const onVisibilityChange = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = awayTitle;
      } else if (saved !== null) {
        if (document.title === awayTitle) document.title = saved;
        saved = null;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (saved !== null && document.title === awayTitle) {
        document.title = saved;
      }
    };
  }, [awayTitle]);

  return null;
}
