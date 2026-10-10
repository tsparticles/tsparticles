/**
 * Stable error codes owned by the emitters path shape.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link "./ErrorMessages.js"} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * The emitters path shape registers these codes at load time through
 * `addErrorMessages(ErrorMessages)`, so they never grow the engine catalog.
 */
export const ErrorCodes = {
  /** No 2d context is available */
  emittersPathNo2dContext: "TSP-3102",
  /** No path data is available */
  emittersPathNoPathData: "TSP-3103",
} as const;
