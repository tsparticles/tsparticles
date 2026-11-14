import { createEngine } from "@tsparticles/engine";
import { loadStarsPreset } from "./index.js";
export { loadStarsPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadStarsPreset?: typeof loadStarsPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadStarsPreset = loadStarsPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
