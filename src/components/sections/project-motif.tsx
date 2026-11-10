import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * The visual on each project card.
 *
 * These are abstract architecture diagrams, not screenshots. Two reasons: the
 * Bentley and SYDLE work cannot show proprietary UI, and a diagram of the
 * *shape* of a system says more about the engineering than a picture of a
 * table does. Drawn from scratch as inline SVG, themed from the same tokens
 * as everything else, so they cost no image request and look right in both
 * themes.
 *
 * `aria-hidden`: each one restates the outcome line that sits beside it, so
 * announcing it twice would only add noise.
 */

const surface = "fill-[var(--bg-elevated)] stroke-[var(--border-strong)]";
const accent = "fill-[var(--accent-soft)] stroke-[var(--accent)]";
const hairline = "stroke-[var(--border-strong)]";

/** A host shell composing independently deployed remotes at runtime. */
function FederationMotif() {
  const remotes = [0, 1, 2, 3, 4];

  return (
    <svg viewBox="0 0 320 160" aria-hidden className="size-full">
      {/* The host shell */}
      <rect
        x="112"
        y="16"
        width="96"
        height="30"
        rx="8"
        className={cn(accent, "stroke-[1.5]")}
      />

      {remotes.map((index) => {
        const x = 20 + index * 58;
        return (
          <g key={index}>
            {/* Registry-driven wiring from the shell down to each remote */}
            <path
              d={`M160 46 V 78 H ${x + 21} V 108`}
              fill="none"
              className={cn(hairline, "stroke-[1.25]")}
              strokeDasharray="3 3"
            />
            <rect
              x={x}
              y="108"
              width="42"
              height="36"
              rx="7"
              className={cn(surface, "stroke-[1.25]")}
            />
            {/* Error isolation: each remote is its own boundary */}
            <circle
              cx={x + 21}
              cy="126"
              r="4"
              className="fill-[var(--accent)]"
            />
          </g>
        );
      })}
    </svg>
  );
}

/** One monolithic iframe integration becoming six deployable units. */
function MigrationMotif() {
  const cells = [0, 1, 2, 3, 4, 5];

  return (
    <svg viewBox="0 0 320 160" aria-hidden className="size-full">
      {/* Before: a single opaque frame */}
      <rect
        x="16"
        y="38"
        width="104"
        height="84"
        rx="8"
        className={cn(surface, "stroke-[1.25]")}
        strokeDasharray="4 4"
      />
      <line
        x1="16"
        y1="38"
        x2="120"
        y2="122"
        className={cn(hairline, "stroke-[1]")}
      />
      <line
        x1="120"
        y1="38"
        x2="16"
        y2="122"
        className={cn(hairline, "stroke-[1]")}
      />

      {/* The migration */}
      <path
        d="M136 80 H 180"
        className={cn("stroke-[var(--accent)]", "stroke-[1.5]")}
        fill="none"
      />
      <path
        d="M174 74 L 181 80 L 174 86"
        fill="none"
        className={cn("stroke-[var(--accent)]", "stroke-[1.5]")}
      />

      {/* After: six independent units */}
      {cells.map((index) => (
        <rect
          key={index}
          x={196 + (index % 3) * 42}
          y={38 + Math.floor(index / 3) * 46}
          width="34"
          height="38"
          rx="6"
          className={cn(accent, "stroke-[1.25]")}
        />
      ))}
    </svg>
  );
}

/** A component library, framework-agnostic, consumed by several products. */
function ComponentsMotif() {
  const tiles = Array.from({ length: 12 }, (_, index) => index);

  return (
    <svg viewBox="0 0 320 160" aria-hidden className="size-full">
      {/* Three consuming products */}
      {[0, 1, 2].map((index) => (
        <g key={index}>
          <rect
            x={34 + index * 88}
            y="14"
            width="64"
            height="24"
            rx="6"
            className={cn(surface, "stroke-[1.25]")}
          />
          <path
            d={`M${66 + index * 88} 38 V 56`}
            className={cn(hairline, "stroke-[1.25]")}
            strokeDasharray="3 3"
            fill="none"
          />
        </g>
      ))}

      {/* One shared library underneath */}
      <rect
        x="20"
        y="56"
        width="280"
        height="88"
        rx="10"
        className={cn(accent, "stroke-[1.5]")}
      />
      {tiles.map((index) => (
        <rect
          key={index}
          x={34 + (index % 6) * 45}
          y={72 + Math.floor(index / 6) * 32}
          width="33"
          height="22"
          rx="4"
          className="fill-[var(--accent)] opacity-25"
        />
      ))}
    </svg>
  );
}

const MOTIFS = {
  federation: FederationMotif,
  migration: MigrationMotif,
  components: ComponentsMotif,
} as const;

export function ProjectMotif({
  motif,
  className,
}: {
  motif: Project["motif"];
  className?: string;
}) {
  const Motif = MOTIFS[motif];

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-card border bg-bg-sunken p-6",
        className,
      )}
    >
      <Motif />
    </div>
  );
}
