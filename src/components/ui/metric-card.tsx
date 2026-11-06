import type { ReactNode } from "react";

import { CountUp } from "@/components/motion/count-up";
import { cn } from "@/lib/cn";

type MetricCardProps = {
  /** The number itself. Counts up when it scrolls into view. */
  value: number;
  /** Rendered immediately after the number, e.g. "%" or "+". */
  suffix?: string;
  prefix?: string;
  decimals?: number;
  /** What the number means. The part a recruiter actually reads. */
  label: ReactNode;
  /** Optional qualifier, e.g. "React 18 + Zustand migration". */
  detail?: ReactNode;
  locale?: string;
  className?: string;
};

export function MetricCard({
  value,
  suffix,
  prefix,
  decimals,
  label,
  detail,
  locale,
  className,
}: MetricCardProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className="text-h1 text-accent tabular-nums">
        <CountUp
          to={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          locale={locale}
        />
      </p>
      <p className="text-small font-medium text-fg">{label}</p>
      {detail ? <p className="text-label text-fg-subtle">{detail}</p> : null}
    </div>
  );
}
