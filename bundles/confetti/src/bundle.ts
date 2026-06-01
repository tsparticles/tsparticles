import { confetti } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export * from "./index.js";
export * from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  confetti?: typeof confetti;
  tsParticles?: typeof tsParticles;
};

globalObject.confetti = confetti;

globalObject.tsParticles = tsParticles;
