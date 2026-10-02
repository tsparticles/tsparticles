import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Message templates for the interactivity plugin error codes, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link "@tsparticles/engine".getErrorMessage | getErrorMessage}.
 */
const ErrorMessages: Record<string, string> = {
  [ErrorCodes.interactivityPluginNotLoaded]: "tsParticles Interactivity Plugin is not loaded",
  [ErrorCodes.interactivityClickHandlerNotSet]: "Click handlers can only be set after calling tsParticles.load()",
};

export { ErrorMessages };
