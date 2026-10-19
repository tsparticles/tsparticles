import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Message templates for the GIF shape error codes, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link "@tsparticles/engine".getErrorMessage | getErrorMessage}.
 */
const ErrorMessages: Record<string, string> = {
  [ErrorCodes.gifNotSupported]: "not a supported GIF file",
  [ErrorCodes.gifFrameSizeTooLarge]: "GIF frame size is to large",
  [ErrorCodes.gifFrameParseError]: 'error while parsing frame {0} "{1}"',
  [ErrorCodes.gifOffscreenCanvasUnsupported]: "could not create offscreen canvas context",
};

export { ErrorMessages };
