import { notFound } from "next/navigation";

/*
 * Any path under a locale that no route claims. Throwing here, rather than
 * letting it fall through to Next's root 404, renders `../not-found.tsx`
 * inside the locale's layout — in the right language, with the site around
 * it.
 */
export default function MissingPage() {
  notFound();
}
