import { DomEngine } from "./Dom/DomEngine.js";

/**
 * @returns the initialized engine object (DOM-aware)
 */
export function initEngine(): DomEngine {
  /**
   * The exposed tsParticles instance
   */
  return new DomEngine();
}
