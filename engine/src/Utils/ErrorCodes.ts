/**
 * Stable error codes owned by the engine.
 *
 * Codes are never reused after a release: each code maps to exactly one English
 * message template in {@link ErrorMessages} and to one row on the website errors
 * page (`https://particles.js.org/errors/#TSP-xxxx`).
 *
 * Plugins and other packages define their own catalogs (using their own ranges)
 * and extend the runtime catalog with {@link addErrorMessages}.
 *
 * Ranges reserved for the engine:
 * - `TSP-100x` — engine core
 * - `TSP-110x` — canvas/offscreen
 * - `TSP-120x` — options validation
 */
export const ErrorCodes = {
  /** Engine/plugin version mismatch ({@link Engine} `checkVersion`) */
  engineVersionMismatch: "TSP-1001",
  /** A valid particle position cannot be found (`Particle`) */
  particlePositionNotFound: "TSP-1002",
  /** Plugins can only be registered before `tsParticles.load()` (`PluginManager`) */
  pluginRegisterAfterLoad: "TSP-1003",
  /** The browser does not support `OffscreenCanvas` (`CanvasManager`) */
  offscreenCanvasUnsupported: "TSP-1101",
  /** The `OffscreenCanvas` transfer failed (`CanvasManager`) */
  offscreenCanvasTransferFailed: "TSP-1102",
  /** Invalid HDR "enable" value (`HDROptions`) */
  hdrEnableInvalid: "TSP-1201",
  /** Invalid HDR "mode" value (`HDROptions`) */
  hdrModeInvalid: "TSP-1202",
  /** Invalid HDR "peakNits" value (`HDROptions`) */
  hdrPeakNitsInvalid: "TSP-1203",
} as const;

/**
 * A stable tsParticles error code, e.g. `"TSP-1001"`.
 *
 * The type is intentionally a plain `string` so that packages other than the engine
 * can define their own codes without an engine release.
 */
export type ErrorCode = string;
