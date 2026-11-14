import { createParticles } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  createParticles?: typeof createParticles;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.createParticles = createParticles;

export * from "./index.js";
