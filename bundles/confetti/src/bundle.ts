import { createConfetti } from "./index.js";
import { createEngine } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  createConfetti?: typeof createConfetti;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.createConfetti = createConfetti;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export * from "./index.js";
export * from "@tsparticles/engine";
