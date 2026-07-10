/**
 * Reads a dotted path (e.g. "particles.move.enable") out of a nested
 * options object, returning `undefined` if any segment along the way
 * is missing or not an object.
 *
 * NOTE: this is a plain property walk. It does NOT special-case arrays
 * — `emitters.shape.type` will return `undefined` when `emitters` is an
 * array, since arrays don't have a `"shape"` property. Callers that
 * need to inspect `emitters`/`absorbers` (which tsParticles allows to
 * be either a single object or an array of objects) should normalize
 * with `asArray()` below and walk each entry individually instead of
 * relying on a dotted path through it.
 */
export function getOptionValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

/**
 * tsParticles allows several option sections (emitters, absorbers) to be
 * either a single config object or an array of config objects. This
 * normalizes either shape into an array so callers can iterate uniformly.
 */
export function asArray<T = Record<string, unknown>>(value: unknown): T[] {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) return value as T[];
  return [value as T];
}

/**
 * Returns true if the option at `path` is "meaningfully enabled":
 * - booleans are used as-is
 * - non-empty arrays count as enabled
 * - objects are enabled unless they have an explicit `enable: false`
 * - any other defined value counts as enabled
 */
export function isOptionEnabled(obj: Record<string, unknown>, path: string): boolean {
  const value = getOptionValue(obj, path);

  if (value === undefined) return false;
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.length > 0;

  if (typeof value === "object" && value !== null) {
    const enableVal = (value as Record<string, unknown>)["enable"];
    if (typeof enableVal === "boolean") return enableVal;
    return true;
  }

  return true;
}
