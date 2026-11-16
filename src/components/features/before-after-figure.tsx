import {
  BeforeAfterSlider,
  type ComparisonRow,
} from "@/components/features/before-after";
import { bcp47 } from "@/i18n/config";
import { getI18n } from "@/i18n/dictionary";

/**
 * A before/after comparison drawn from published figures, scrubbable — the
 * MDX-facing wrapper around the client slider, filling in its labels.
 *
 * Not in `src/mdx-components.tsx`: the case study page passes it to the MDX
 * body as a component, which keeps the client slider in the page's static
 * module graph (see the note in that file).
 *
 * Values are whatever the case study states. When a source gives only a
 * percentage, index the before value at 100 and say so in the caption — the
 * component shows the change, and invents no absolute numbers.
 *
 * ```mdx
 * <BeforeAfter
 *   caption="Indexed: before = 100."
 *   rows={[{ label: "Page performance cost", before: 100, after: 40 }]}
 * />
 * ```
 */
export async function BeforeAfter({
  rows,
  caption,
}: {
  rows: ComparisonRow[];
  caption: string;
}) {
  const { locale, messages } = await getI18n();

  return (
    <BeforeAfterSlider
      rows={rows}
      caption={caption}
      locale={bcp47[locale]}
      labels={{
        before: messages.caseStudy.before,
        after: messages.caseStudy.after,
        slider: messages.caseStudy.compare,
      }}
    />
  );
}
