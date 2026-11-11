"use client";

import { Printer } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useMessages } from "@/i18n/provider";

/**
 * Opens the browser's print dialog, which is also its "Save as PDF".
 *
 * The résumé page is the PDF: one source, laid out for paper by the print
 * stylesheet, rather than a separately exported file that drifts out of date
 * the first time a job title changes.
 */
export function PrintButton({
  variant = "secondary",
  ...props
}: Omit<ButtonProps, "onClick" | "children">) {
  const messages = useMessages();

  return (
    <Button variant={variant} onClick={() => window.print()} {...props}>
      <Printer aria-hidden className="size-4" />
      {messages.resume.print}
    </Button>
  );
}
