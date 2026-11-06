/**
 * The `type` an inline `<script>` should carry so it runs on the server pass
 * and stays inert — and silent — on the client.
 *
 * Inline scripts are the only way to apply a `localStorage` value (theme) or a
 * client-only format (local time) *before first paint*, which is what avoids a
 * flash of the wrong UI. But React only executes them in the server-rendered
 * HTML: on the client it builds the element and never runs it, so react-dom
 * logs "Encountered a script tag while rendering React component".
 *
 * react-dom skips that warning for scripts whose `type` is a non-JavaScript
 * "data block" MIME. So: `text/javascript` on the server, where the browser
 * parses and runs it, and `text/plain` on the client, where it would do nothing
 * regardless. The resulting attribute mismatch is covered by
 * `suppressHydrationWarning` on the element.
 *
 * @see https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export function inlineScriptType(): "text/javascript" | "text/plain" {
  return typeof window === "undefined" ? "text/javascript" : "text/plain";
}
