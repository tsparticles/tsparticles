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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- globalThis.tsParticles may not exist at runtime (declare global is aspirational)
  if (globalThis.tsParticles) {
    return globalThis.tsParticles;
  }

  return new Engine();
}
