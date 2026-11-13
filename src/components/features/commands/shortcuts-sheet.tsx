"use client";

import { X } from "lucide-react";
import { Fragment } from "react";

import { IconButton } from "@/components/ui/icon-button";
import { Kbd } from "@/components/ui/kbd";
import { useI18n } from "@/i18n/provider";
import { shortcuts } from "@/lib/shortcuts";
import { useIsApple } from "@/lib/use-is-apple";
import { useModal } from "@/lib/use-modal";

/**
 * The `?` sheet. Read straight from `src/lib/shortcuts.ts`, the same table
 * the listener acts on, so the two cannot disagree.
 */
export default function ShortcutsSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { messages } = useI18n();
  const dialog = useModal(open, onClose);
  const isApple = useIsApple();
  const t = messages.shortcuts;

  return (
    <dialog
      ref={dialog}
      data-commands
      aria-labelledby="shortcuts-title"
      className="m-0 mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-md rounded-card border border-border bg-bg-elevated p-0 text-fg shadow-floating backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-5 p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 id="shortcuts-title" className="text-h3">
            {t.title}
          </h2>
          <IconButton
            aria-label={t.close}
            size="sm"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </IconButton>
        </div>

        <dl className="flex flex-col gap-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.id}
              className="flex items-center justify-between gap-4"
            >
              <dt className="text-small text-fg-muted">
                {t.items[shortcut.id]}
              </dt>
              <dd className="flex shrink-0 items-center gap-1.5 text-label text-fg-subtle">
                {shortcut.keys[0] === "mod" ? (
                  <>
                    <Kbd>{isApple === false ? "Ctrl" : "⌘"}</Kbd>
                    <Kbd>{shortcut.keys[1].toUpperCase()}</Kbd>
                  </>
                ) : (
                  shortcut.keys.map((key, index) => (
                    <Fragment key={key}>
                      {index > 0 ? <span>{t.then}</span> : null}
                      <Kbd>{key}</Kbd>
                    </Fragment>
                  ))
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </dialog>
  );
}
