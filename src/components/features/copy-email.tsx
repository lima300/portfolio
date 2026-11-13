"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useMessages } from "@/i18n/provider";
import { site } from "@/lib/site";
import { useCopyEmail } from "@/lib/use-copy-email";

type CopyEmailProps = Omit<ButtonProps, "onClick" | "children"> & {
  /** Shows the address next to the icon, for the contact section. */
  showAddress?: boolean;
};

/**
 * Copies the address instead of firing a `mailto:`.
 *
 * A `mailto:` link assumes a configured mail client, which on a work laptop
 * is often a coin flip; the clipboard works everywhere. The toast is the
 * confirmation, and the button itself flips to a tick for two seconds so the
 * feedback is visible even if the toast is missed.
 */
export function CopyEmail({
  showAddress = false,
  variant = "secondary",
  ...props
}: CopyEmailProps) {
  const messages = useMessages();
  const copyEmail = useCopyEmail();
  const [copied, setCopied] = useState(false);

  const onClick = useCallback(async () => {
    if (!(await copyEmail())) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [copyEmail]);

  return (
    <Button variant={variant} onClick={onClick} {...props}>
      {copied ? (
        <Check aria-hidden className="size-4 text-accent" />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
      {showAddress
        ? site.email
        : copied
          ? messages.contact.copied
          : messages.contact.copyEmail}
    </Button>
  );
}
