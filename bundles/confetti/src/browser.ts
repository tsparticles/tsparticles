import { createConfetti } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  createConfetti?: typeof createConfetti;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.createConfetti = createConfetti;

export * from "./index.js";
