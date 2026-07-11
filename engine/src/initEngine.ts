import { Engine } from "./Core/Engine.js";

/**
 * @returns the initialized engine object
 */
export function initEngine(): Engine {
  /**
   * Reuse the existing global engine instance if present (e.g. when multiple
   * CDN bundle scripts each inline `@tsparticles/engine`). In v5 the global
   * singleton will be removed and this guard can be dropped.
   */

  const existing = globalThis.tsParticles as Engine | undefined;

  if (existing?.pluginManager) {
    return existing;
  }

  return new Engine();
}
