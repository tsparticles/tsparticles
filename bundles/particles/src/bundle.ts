import { particles } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { particles } from "./index.js";
export type { ParticlesOptions } from "./index.js";
export * from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  particles?: typeof particles;
  tsParticles?: typeof tsParticles;
};

globalObject.particles = particles;

globalObject.tsParticles = tsParticles;
