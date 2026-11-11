import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";

import { getMessages } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";

/**
 * How case study prose renders.
 *
 * No typography plugin: every element maps onto the same type scale and
 * colour tokens as the rest of the site, so an article cannot drift into a
 * second visual language. Headings inside an article start at h2 — the page
 * owns the h1.
 *
 * Next requires this file for `@next/mdx` in the App Router, at the root of
 * `src/`.
 */

/**
 * One entry in a decision log: what was chosen, what it was chosen over, and
 * why. The template asks every case study for these, because the trade-off
 * is the part of senior work a résumé line cannot show.
 *
 * ```mdx
 * <Decision chose="Zustand" over="Redux">Because…</Decision>
 * ```
 */
export async function Decision({
  chose,
  over,
  children,
}: {
  chose: string;
  over: string;
  children: ReactNode;
}) {
  const messages = await getMessages();

  return (
    <div className="my-6 rounded-card border bg-bg-elevated p-6 shadow-soft">
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-small">
        <strong className="font-semibold text-accent">{chose}</strong>
        <span className="font-mono text-label text-fg-subtle uppercase">
          {messages.caseStudy.over}
        </span>
        <span className="text-fg-muted line-through decoration-fg-subtle/60">
          {over}
        </span>
      </p>
      <div className="mt-3 text-small text-fg-muted [&>p]:my-0">{children}</div>
    </div>
  );
}

const components: MDXComponents = {
  h2: ({ className, children, ...props }: ComponentProps<"h2">) => (
    <h2
      className={cn(
        "mt-16 mb-4 scroll-mt-24 text-h3 text-balance-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: ComponentProps<"h3">) => (
    <h3
      className={cn("mt-10 mb-3 text-lead font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ className, ...props }: ComponentProps<"p">) => (
    <p className={cn("my-5 text-body text-fg-muted", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul
      className={cn(
        "my-5 flex list-disc flex-col gap-2 pl-5 text-body text-fg-muted marker:text-accent",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol
      className={cn(
        "my-5 flex list-decimal flex-col gap-2 pl-5 text-body text-fg-muted marker:font-mono marker:text-accent",
        className,
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }: ComponentProps<"strong">) => (
    <strong className={cn("font-semibold text-fg", className)} {...props} />
  ),
  a: ({ className, href, children, ...props }: ComponentProps<"a">) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={cn(
          "font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-200 hover:decoration-accent",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "my-6 border-l-2 border-accent pl-5 text-lead text-fg [&>p]:text-fg",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code
      className={cn(
        "rounded-md bg-bg-sunken px-1.5 py-0.5 font-mono text-[0.875em] text-fg",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-card border bg-bg-sunken p-5 font-mono text-small [&>code]:bg-transparent [&>code]:p-0",
        className,
      )}
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-border" />,
  Decision,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
