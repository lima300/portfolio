"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

/** Demonstrates the toast, which needs a client event to fire. */
export function CopyEmailDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() => toast("Email copied to clipboard")}
      >
        <Copy aria-hidden className="size-4" />
        Success toast
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast("Nothing to copy here", "info")}
      >
        Info toast
      </Button>
    </div>
  );
}
