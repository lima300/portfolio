"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a native `<dialog>` from a boolean.
 *
 * `showModal()` brings the platform's focus trap, Escape handling, `inert`
 * page and focus restoration. Escape closes the element directly, so the
 * `close` event — not the boolean — is the source of truth for "it closed",
 * and `onClose` keeps the two in step. A click on the backdrop lands on the
 * dialog element itself (its content fills it), which closes it too.
 */
export function useModal(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Without an `autofocus` element, the platform focuses the dialog
      // itself. React does not render `autoFocus` as the attribute, so the
      // element that should start with focus opts in with `data-autofocus`.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onBackdrop);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onBackdrop);
    };
  }, [onClose]);

  return ref;
}
