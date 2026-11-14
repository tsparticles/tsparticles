import { Engine } from "./Core/Engine.js";

/**
 * Creates an independent engine without initializing plugins or accessing the DOM.
 * @returns a new engine owned by the caller
 */
export function createEngine(): Engine {
  return new Engine();
}
