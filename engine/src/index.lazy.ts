import { initEngine } from "./initEngine.js";

/**
 * Shared tsParticles engine instance for lazy/global builds.
 */
const tsParticles = initEngine();

globalThis.tsParticles = tsParticles;

export * from "./exports.js";
export type * from "./export-types.js";

export { tsParticles };
