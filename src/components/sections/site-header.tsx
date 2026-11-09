"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { LanguageSwitch } from "@/components/features/language-switch";
import { ThemeToggle } from "@/components/features/theme-toggle";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { useI18n } from "@/i18n/provider";
import { navItems } from "@/lib/routes";

/**
 * The glass bar.
 *
 * It does not shrink on scroll. A sticky element that changes height pushes
 * everything below it, and the plan's own motion rule is to animate only
 * `transform`, `opacity` and `filter`. So the height is fixed and the bar
 * *materialises* instead: the frosted background, hairline and shadow fade in
 * once you leave the top of the page. Same intent, no layout shift — and it
 * is what Apple's own nav actually does.
 *
 * Scroll state comes from an `IntersectionObserver` watching a zero-height
 * sentinel rather than a scroll listener, so there is no work on the main
 * thread while scrolling.
 */
export function SiteHeader() {
  const { locale, messages } = useI18n();
  const header = useRef<HTMLElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const target = sentinel.current;
    const bar = header.current;
    if (!target || !bar) return;

    const observer = new IntersectionObserver(([entry]) => {
      // The sentinel sits at the very top: out of view means we have scrolled.
      bar.dataset.scrolled = entry.isIntersecting ? "false" : "true";
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const openMenu = useCallback(() => menu.current?.showModal(), []);
  const closeMenu = useCallback(() => menu.current?.close(), []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-px" />

      <header
        ref={header}
        data-scrolled="false"
        className={[
          "sticky top-0 z-50 border-b border-transparent",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out-expo",
          "data-[scrolled=true]:border-glass-border data-[scrolled=true]:bg-glass",
          "data-[scrolled=true]:shadow-soft data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:backdrop-saturate-150",
        ].join(" ")}
      >
        <Container
          as="nav"
          aria-label={messages.a11y.primaryNavigation}
          className="flex h-16 items-center justify-between gap-4"
        >
          <BrandMark href={`/${locale}`} label={messages.a11y.homeLink} />

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href(locale)}
                  prefetch={item.prefetch}
                  className="rounded-control px-3 py-2 text-small font-medium text-fg-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
                >
                  {messages.nav[item.id]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
            <IconButton
              aria-label={messages.a11y.openMenu}
              onClick={openMenu}
              className="md:hidden"
            >
              <Menu />
            </IconButton>
          </div>
        </Container>
      </header>

      {/*
        A native <dialog> opened with showModal(). The platform supplies the
        focus trap, the Escape handler, the backdrop and `inert` on everything
        behind it — all the parts a hand-rolled menu gets wrong, and about
        20 kB less than reaching for a dialog library.
      */}
      <dialog
        ref={menu}
        aria-label={messages.a11y.primaryNavigation}
        className="m-0 h-full max-h-none w-full max-w-none bg-bg p-0 backdrop:bg-transparent md:hidden"
      >
        <Container className="flex h-16 items-center justify-between">
          <BrandMark href={`/${locale}`} label={messages.a11y.homeLink} />
          <IconButton aria-label={messages.a11y.closeMenu} onClick={closeMenu}>
            <X />
          </IconButton>
        </Container>

        <Container>
          <ul className="flex flex-col gap-1 py-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href(locale)}
                  prefetch={item.prefetch}
                  onClick={closeMenu}
                  className="block rounded-control py-3 text-h3 font-semibold transition-colors duration-200 hover:text-accent"
                >
                  {messages.nav[item.id]}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </dialog>
    </>
  );
}
