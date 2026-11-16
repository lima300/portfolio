/**
 * Renders a schema.org graph as JSON-LD.
 *
 * `<` is escaped so a value can never close the script element early — the
 * data is ours, but the escape costs nothing and removes the question. React
 * does not warn about this script: `application/ld+json` is a data block, not
 * JavaScript, so there is nothing for it to (not) execute on the client.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
