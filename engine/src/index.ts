import { init } from "./init.js";

const tsParticles = init();

globalThis.tsParticles = tsParticles;

export * from "./exports.js";
export type * from "./export-types.js";

export { tsParticles };
