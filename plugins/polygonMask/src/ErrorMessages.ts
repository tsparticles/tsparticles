import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Message templates for the polygon mask plugin error codes, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link "@tsparticles/engine".getErrorMessage | getErrorMessage}.
 */
const ErrorMessages: Record<string, string> = {
  [ErrorCodes.polygonNotFound]: "No polygon found, you need to specify SVG url in config.",
  [ErrorCodes.polygonDownloadError]: "Error occurred during polygon mask download",
  [ErrorCodes.polygonDataNotLoaded]: "No polygon data loaded.",
};

export { ErrorMessages };
