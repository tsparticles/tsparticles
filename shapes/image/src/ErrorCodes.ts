/**
 * Stable error codes owned by the image shape.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link "./ErrorMessages.js"} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * The image shape registers these codes at load time through
 * `addErrorMessages(ErrorMessages)`, so they never grow the engine catalog.
 */
export const ErrorCodes = {
  /** The images collection is missing */
  imageCollectionNotFound: "TSP-2001",
  /** The image source was not provided */
  imageSourceNotFound: "TSP-2002",
  /** The requested image was not found */
  imageNotFound: "TSP-2003",
  /** The image shape was not initialized */
  imageShapeNotInitialized: "TSP-2004",
} as const;
