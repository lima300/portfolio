import type { Localized } from "./types";

export type Testimonial = {
  id: string;
  /**
   * The quote, without surrounding quotation marks — the component adds
   * typographic ones.
   *
   * Recommendations arrive in whatever language they were written in. Put the
   * original under its own locale and a faithful translation under the other,
   * rather than leaving a reader with a quote they cannot read.
   */
  quote: Localized;
  /** Attribution. A quote without a name is not a testimonial. */
  name: string;
  role: Localized;
  company: string;
  /** How they know the work: "Manager at Bentley Systems", "Mentee". */
  relationship: Localized;
  /** Link to the original, if it is public. */
  source?: string;
};

/**
 * Colleague recommendations.
 *
 * Empty for now, and the section does not render while it is — an invented
 * testimonial is the fastest way to lose the trust the rest of this site is
 * trying to earn.
 *
 * TODO(otavio): paste the LinkedIn recommendations in here. They cannot be
 * read programmatically: LinkedIn blocks automated access, and the
 * recommendations on a profile need an authenticated session to see in full.
 * Each entry needs the quote, the person's name, their role and company, and
 * how they worked with you. The section appears on its own once the first
 * one lands.
 */
export const testimonials: readonly Testimonial[] = [] as const;

export const hasTestimonials = testimonials.length > 0;
