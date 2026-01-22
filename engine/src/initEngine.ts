import { Engine } from "./Core/Engine.js";

/**
 *
 * @returns the initialized engine object
 */
export function initEngine(): Engine {
  /**
   * The exposed tsParticles instance
   */
  return new Engine();
}
