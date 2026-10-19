import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Message templates for the particles collisions interaction error codes, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link "@tsparticles/engine".getErrorMessage | getErrorMessage}.
 */
const ErrorMessages: Record<string, string> = {
  [ErrorCodes.overlapNotPlaced]: "Particle is overlapping and can't be placed",
};

export { ErrorMessages };
