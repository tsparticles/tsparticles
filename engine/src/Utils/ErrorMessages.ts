import { ErrorCodes } from "./ErrorCodes.js";

/**
 * Development-only message templates owned by the engine, keyed by code.
 *
 * Placeholders use the `{0}`, `{1}` positional syntax understood by
 * {@link getErrorMessage}. This module is referenced only from the development
 * branch of `getErrorMessage()` so that production bundlers can tree-shake it
 * away entirely.
 */
const messages: Record<string, string> = {
  [ErrorCodes.engineVersionMismatch]:
    "The tsParticles version is different from the loaded plugins version. Engine version: {0}. Plugin version: {1}",
  [ErrorCodes.particlePositionNotFound]: "a valid position cannot be found for particle",
  [ErrorCodes.pluginRegisterAfterLoad]: "Register plugins can only be done before calling tsParticles.load()",
  [ErrorCodes.offscreenCanvasUnsupported]: "OffscreenCanvas is required but not supported by this browser",
  [ErrorCodes.offscreenCanvasTransferFailed]: "OffscreenCanvas transfer failed",
  [ErrorCodes.hdrEnableInvalid]: 'Invalid HDR "enable" value: expected a boolean, got "{0}"',
  [ErrorCodes.hdrModeInvalid]: 'Invalid HDR "mode" value: expected one of {0}, got "{1}"',
  [ErrorCodes.hdrPeakNitsInvalid]: 'Invalid HDR "peakNits" value: expected a positive number, got "{0}"',
};

export { messages };
