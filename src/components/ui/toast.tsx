"use client";

import { Check, Info } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

type ToastTone = "success" | "info";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastApi = {
  toast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

const DURATION = 2600;

/**
 * A single, ephemeral status message — "Email copied", and little else.
 *
 * Hand-rolled rather than pulled from a component library because the
 * requirement really is that small, and the accessible contract is short: an
 * `aria-live="polite"` region that already exists in the DOM before anything
 * is announced, so assistive technology is watching when the message arrives.
 * A library would add a queue, swipe gestures and ~10 kB for none of it.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const toast = useCallback((message: string, tone: ToastTone = "success") => {
    const id = (nextId.current += 1);
    setToasts((current) => [...current, { id, message, tone }]);

    const timer = setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
      timers.current.delete(id);
    }, DURATION);

    timers.current.set(id, timer);
  }, []);

  // Unmounting mid-toast would otherwise leave a timer holding a setState.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const timer of pending.values()) clearTimeout(timer);
      pending.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div
        // The region is always present, never conditionally rendered: a live
        // region added at the same moment as its content is not announced.
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-100 flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((item) => (
          <output
            key={item.id}
            data-toast=""
            className={cn(
              "pointer-events-auto flex items-center gap-2.5 rounded-control border glass px-4 py-2.5",
              "text-small font-medium shadow-floating",
            )}
          >
            {item.tone === "success" ? (
              <Check aria-hidden className="size-4 text-accent" />
            ) : (
              <Info aria-hidden className="size-4 text-fg-muted" />
            )}
            {item.message}
          </output>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return value;
}
