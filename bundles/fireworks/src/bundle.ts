import { fireworks } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export * from "./index.js";
export * from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  fireworks?: typeof fireworks;
  tsParticles?: typeof tsParticles;
};

globalObject.fireworks = fireworks;

globalObject.tsParticles = tsParticles;
