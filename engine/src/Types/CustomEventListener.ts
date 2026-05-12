import type { CustomEventArgs } from "./CustomEventArgs.js";

/**
 * Event listener used by the engine event dispatcher.
 */
export type CustomEventListener = (args?: CustomEventArgs) => void;
