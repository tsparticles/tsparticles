import { createEngine } from "@tsparticles/engine";
import { createParticles } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  createParticles?: typeof createParticles;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.createParticles = createParticles;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export type { ParticlesOptions } from "./index.js";
export { createParticles } from "./index.js";
export * from "@tsparticles/engine";
