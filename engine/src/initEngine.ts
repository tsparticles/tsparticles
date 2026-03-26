import { Engine } from "./Core/Engine.js";

/**
 * @returns the initialized engine object
 */
export function initEngine(): Engine {
  const engine = new Engine();

  globalThis.tsParticles = engine;

  /**
   * The exposed tsParticles instance
   */
  return engine;
}
