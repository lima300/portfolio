import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { CountUp } from "@/components/motion/count-up";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { MetricCard } from "@/components/ui/metric-card";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tooltip } from "@/components/ui/tooltip";

import { CopyEmailDemo } from "./copy-email-demo";

/*
 * Every component, variant and state on one page.
 *
 * Reviewing primitives here rather than hunting them across real pages is
 * what makes "check it in both themes at both breakpoints" a 30-second job.
 * It is also the cheapest place to point an accessibility scan: a violation
 * caught in a primitive is caught everywhere it is later composed.
 */

export const metadata: Metadata = {
  title: "Kitchen sink",
  // A development surface. It ships, but it must never be indexed.
  robots: { index: false, follow: false },
};

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t py-6">
      <p className="font-mono text-label text-fg-subtle">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12">
      <SectionHeading as="h2" title={title} description={description} />
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function KitchenSinkPage() {
  return (
    <main id="main" className="flex-1 py-16">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Development"
          title="Kitchen sink"
          description="Every primitive, variant and state. Check it in light and dark, at 375px and 1440px, then with a keyboard only."
        />

        <Section title="Button" description="Press scale is on every variant.">
          <Row label="variant">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </Row>
          <Row label="size">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="with icon · disabled">
            <Button>
              View work
              <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </Row>
          <Row label="magnetic (desktop pointer only)">
            <Magnetic>
              <Button size="lg">Hover me</Button>
            </Magnetic>
          </Row>
        </Section>

        <Section
          title="IconButton"
          description="aria-label is required by the type, not by convention. The brand marks are hand-written SVG: lucide no longer ships them."
        >
          <Row label="variant · size">
            <IconButton aria-label="GitHub profile">
              <GitHubIcon />
            </IconButton>
            <IconButton aria-label="LinkedIn profile" variant="outline">
              <LinkedInIcon />
            </IconButton>
            <IconButton aria-label="Instagram profile" size="sm">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Instagram profile" size="lg">
              <InstagramIcon />
            </IconButton>
          </Row>
          <Row label="with tooltip (hover, and focus with Tab)">
            <Tooltip content="GitHub">
              <IconButton aria-label="GitHub profile">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip content="LinkedIn" side="right">
              <IconButton aria-label="LinkedIn profile">
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
          </Row>
        </Section>

        <Section title="Pill">
          <Row label="variant · dot">
            <Pill>Available</Pill>
            <Pill dot>Open to Senior/Staff roles</Pill>
            <Pill variant="neutral">TypeScript</Pill>
            <Pill variant="outline">Module Federation</Pill>
          </Row>
        </Section>

        <Section title="Card">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="elevated">
              <p className="text-small font-medium">Elevated</p>
              <p className="mt-1 text-label text-fg-muted">
                The default surface for grouped content.
              </p>
            </Card>
            <Card variant="sunken">
              <p className="text-small font-medium">Sunken</p>
              <p className="mt-1 text-label text-fg-muted">
                Quiet, for dense grids.
              </p>
            </Card>
            <Card variant="glass">
              <p className="text-small font-medium">Glass</p>
              <p className="mt-1 text-label text-fg-muted">
                Frosted, for anything floating.
              </p>
            </Card>
            <Card variant="product" padding="lg">
              <p className="text-small font-medium">Product</p>
              <p className="mt-1 text-label text-fg-muted">
                Lifts on hover. Used for case studies.
              </p>
            </Card>
          </div>
        </Section>

        <Section
          title="MetricCard"
          description="Counts up on entering view. Scroll away and back to replay, or turn on reduced motion to see it render at rest."
        >
          <Card variant="sunken" padding="lg">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                value={60}
                suffix="%"
                label="Performance improvement"
                detail="React 18 + Zustand migration"
              />
              <MetricCard
                value={6}
                label="Micro-frontends"
                detail="Replacing iframe integrations"
              />
              <MetricCard
                value={100}
                suffix="+"
                label="Design system components"
              />
              <MetricCard
                value={100000}
                suffix="+"
                label="Users on the platform"
              />
            </div>
          </Card>
        </Section>

        <Section title="SectionHeading">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Selected work"
              title="Platforms that stayed fast as they grew"
              description="Each project answers the same four questions: what problem, what I owned, what I traded off, what resulted."
            />
            <SectionHeading
              as="h3"
              align="center"
              title="Centred, no eyebrow"
              description="The same component, different alignment."
            />
          </div>
        </Section>

        <Section
          title="Reveal"
          description="Fades, rises and sharpens on entering view. The hidden state only exists when scripting is on and motion is not reduced, so content can never be stranded invisible."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <Reveal key={index} delay={index * 80}>
                <Card variant="sunken">
                  <p className="text-small font-medium">
                    Staggered {index + 1}
                  </p>
                  <p className="mt-1 text-label text-fg-muted">
                    {index * 80}ms delay
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          title="Parallax"
          description="A Server Component: the drift is a CSS scroll-driven animation, so it ships no JavaScript at all."
        >
          <Card variant="sunken" padding="lg" className="overflow-hidden">
            <div className="flex items-center justify-around gap-6">
              <Parallax distance={1.5}>
                <Pill variant="neutral">drift 1.5rem</Pill>
              </Parallax>
              <Parallax distance={-1.5}>
                <Pill variant="neutral">inverted</Pill>
              </Parallax>
              <Parallax distance={3}>
                <Pill variant="neutral">drift 3rem</Pill>
              </Parallax>
            </div>
          </Card>
        </Section>

        <Section
          title="Toast"
          description="One aria-live region, present in the DOM from the start so announcements are actually heard."
        >
          <CopyEmailDemo />
        </Section>

        <Section title="Type scale">
          <div className="flex flex-col gap-4 border-t pt-6">
            <p className="text-display">Display</p>
            <p className="text-h1">Heading 1</p>
            <p className="text-h2">Heading 2</p>
            <p className="text-h3">Heading 3</p>
            <p className="text-lead text-fg-muted">
              Lead — the sentence that carries the pitch.
            </p>
            <p className="measure text-body">
              Body. Lead with outcomes and numbers, then explain how. Written
              for two readers: the scannable version is for recruiters, the
              depth is for engineers.
            </p>
            <p className="text-small text-fg-muted">
              Small — secondary copy and captions.
            </p>
            <p className="font-mono text-label text-fg-subtle">
              Label — mono, for metadata and eyebrows.
            </p>
            <p className="text-body tabular-nums">
              Tabular numerals, for counters: <CountUp to={1234567} /> ·{" "}
              <CountUp to={98.6} decimals={1} suffix="%" />
            </p>
          </div>
        </Section>

        <Section
          title="Surfaces and tokens"
          description="Every pair here is asserted against WCAG AA in tests/unit/contrast.test.ts."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                ["--bg", "bg-bg"],
                ["--bg-elevated", "bg-bg-elevated"],
                ["--bg-sunken", "bg-bg-sunken"],
                ["--accent", "bg-accent"],
                ["--accent-hover", "bg-accent-hover"],
                ["--accent-soft", "bg-accent-soft"],
              ] as const
            ).map(([token, surface]) => (
              <div key={token} className="flex flex-col gap-2">
                <div
                  className={`${surface} h-20 rounded-card border shadow-soft`}
                />
                <code className="font-mono text-label text-fg-subtle">
                  {token}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card variant="elevated">
              <p className="text-small text-fg">--fg on --bg-elevated</p>
              <p className="text-small text-fg-muted">--fg-muted</p>
              <p className="text-small text-fg-subtle">--fg-subtle</p>
              <p className="text-small text-accent">--accent</p>
            </Card>
            <Card variant="sunken">
              <p className="text-small text-fg">--fg on --bg-sunken</p>
              <p className="text-small text-fg-muted">--fg-muted</p>
              <p className="text-small text-fg-subtle">--fg-subtle</p>
              <p className="text-small text-accent">--accent</p>
            </Card>
            <div className="rounded-card bg-accent p-6">
              <p className="text-small text-accent-fg">
                --accent-fg on --accent
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
