import { init } from "./init.js";

const tsParticles = init();

window.tsParticles = tsParticles;

export * from "./exports.js";

export { tsParticles };
