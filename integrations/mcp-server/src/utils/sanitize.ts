/**
 * Neutralizes user-supplied values before they are interpolated into
 * human-readable tool messages that the consuming LLM may re-read.
 *
 * Control characters (including newlines) are stripped so a malicious
 * value can't break out of the surrounding prose or smuggle a second
 * instruction/"command" via line breaks, whitespace is collapsed, and the
 * result is wrapped in inline code backticks so the model treats it as
 * data rather than instructions. Backticks inside the value are removed
 * so the fencing can't be terminated early. The caller also therefore
 * gets a value that is safe to embed inside a quoted title.
 */
export function sanitizeReflection(value: unknown): string {
  const str = typeof value === "string" ? value : String(value);
  const cleaned = str
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return `\`${cleaned.replace(/`/g, "")}\``;
}
