/**
 * Stable error codes owned by the polygon mask plugin.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link "./ErrorMessages.js"} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * The polygon mask plugin registers these codes at load time through
 * `addErrorMessages(ErrorMessages)`, so they never grow the engine catalog.
 */
export const ErrorCodes = {
  /** No polygon was found */
  polygonNotFound: "TSP-3001",
  /** The polygon mask SVG download failed */
  polygonDownloadError: "TSP-3002",
  /** No polygon data has been loaded */
  polygonDataNotLoaded: "TSP-3003",
} as const;
