import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Message templates for the emitters path shape error codes, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link "@tsparticles/engine".getErrorMessage | getErrorMessage}.
 */
const ErrorMessages: Record<string, string> = {
  [ErrorCodes.emittersPathNo2dContext]: "No 2d context available",
  [ErrorCodes.emittersPathNoPathData]: "No path data available",
};

export { ErrorMessages };
