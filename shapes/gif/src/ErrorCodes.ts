/**
 * Stable error codes owned by the GIF shape.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link "./ErrorMessages.js"} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * The GIF shape registers these codes at load time through
 * `addErrorMessages(ErrorMessages)`, so they never grow the engine catalog.
 */
export const ErrorCodes = {
  /** The file is not a supported GIF */
  gifNotSupported: "TSP-2101",
  /** The GIF frame size is too large */
  gifFrameSizeTooLarge: "TSP-2102",
  /** A GIF frame failed to parse (carries the original error as `cause`) */
  gifFrameParseError: "TSP-2103",
  /** The offscreen canvas context cannot be created */
  gifOffscreenCanvasUnsupported: "TSP-2104",
} as const;
