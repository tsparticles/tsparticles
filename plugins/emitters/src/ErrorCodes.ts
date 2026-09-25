/**
 * Stable error codes owned by the emitters plugin.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link "./ErrorMessages.js"} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * The emitters plugin registers these codes at load time through
 * `addErrorMessages(ErrorMessages)`, so they never grow the engine catalog.
 */
export const ErrorCodes = {
  /** The emitters plugin is not loaded */
  emittersPluginNotLoaded: "TSP-3101",
} as const;
