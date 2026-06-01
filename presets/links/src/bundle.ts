import { loadLinksPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadLinksPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLinksPreset?: typeof loadLinksPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadLinksPreset = loadLinksPreset;

globalObject.tsParticles = tsParticles;
