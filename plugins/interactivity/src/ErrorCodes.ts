/**
 * Stable error codes owned by the interactivity plugin.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link "./ErrorMessages.js"} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * The interactivity plugin registers these codes at load time through
 * `addErrorMessages(ErrorMessages)`, so they never grow the engine catalog.
 */
export const ErrorCodes = {
  /** The interactivity plugin is not loaded */
  interactivityPluginNotLoaded: "TSP-3201",
  /** Click handlers can only be set after `tsParticles.load()` */
  interactivityClickHandlerNotSet: "TSP-3202",
} as const;
