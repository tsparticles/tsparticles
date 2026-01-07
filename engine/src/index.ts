import { initEngine } from "./initEngine.js";

const tsParticles = initEngine();

globalThis.tsParticles = tsParticles;

export * from "./exports.js";
export type * from "./export-types.js";

export { tsParticles };
