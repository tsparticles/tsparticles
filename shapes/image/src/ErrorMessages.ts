import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Message templates for the image shape error codes, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link "@tsparticles/engine".getErrorMessage | getErrorMessage}.
 */
const ErrorMessages: Record<string, string> = {
  [ErrorCodes.imageCollectionNotFound]: "No images collection found",
  [ErrorCodes.imageSourceNotFound]: "No image source provided",
  [ErrorCodes.imageNotFound]: "{0} not found",
  [ErrorCodes.imageShapeNotInitialized]: "Image shape not initialized",
};

export { ErrorMessages };
