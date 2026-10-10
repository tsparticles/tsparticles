import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Message templates for the move plugin error codes, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link "@tsparticles/engine".getErrorMessage | getErrorMessage}.
 */
const ErrorMessages: Record<string, string> = {
  [ErrorCodes.baseMoverNotLoaded]: "tsParticles Base Mover is not loaded",
};

export { ErrorMessages };
