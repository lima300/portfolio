"use client";

import { useCallback } from "react";

import { useToast } from "@/components/ui/toast";
import { useMessages } from "@/i18n/provider";
import { site } from "@/lib/site";

/**
 * Copies the address and confirms with a toast. Shared by the copy button and
 * the command palette, so both say the same thing when it works — and when it
 * does not.
 *
 * Resolves to whether the copy succeeded.
 */
export function useCopyEmail() {
  const messages = useMessages();
  const { toast } = useToast();

  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast(messages.contact.emailCopied);
      return true;
    } catch {
      // Denied permission, or an insecure context. Tell them the address
      // rather than failing silently.
      toast(messages.contact.emailCopyFailed, "info");
      return false;
    }
  }, [messages, toast]);
}
