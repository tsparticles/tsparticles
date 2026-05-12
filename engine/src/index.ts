import { initEngine } from "./initEngine.js";

/**
 * Shared tsParticles engine instance.
 */
const tsParticles = initEngine();

export * from "./exports.js";
export type * from "./export-types.js";

export { tsParticles };
