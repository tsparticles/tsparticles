/**
 * Stable error codes owned by the particles collisions interaction.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link "./ErrorMessages.js"} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * The collisions interaction registers these codes at load time through
 * `addErrorMessages(ErrorMessages)`, so they never grow the engine catalog.
 */
export const ErrorCodes = {
  /** The particle overlaps and cannot be placed */
  overlapNotPlaced: "TSP-4001",
} as const;
