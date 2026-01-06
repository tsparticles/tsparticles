import { init } from "./init.js";

const tsParticles = init();

globalThis.tsParticles = tsParticles;

export * from "./exports.js";

export { tsParticles };
