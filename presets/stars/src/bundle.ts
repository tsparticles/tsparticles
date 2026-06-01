import { loadStarsPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadStarsPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadStarsPreset?: typeof loadStarsPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadStarsPreset = loadStarsPreset;

globalObject.tsParticles = tsParticles;
