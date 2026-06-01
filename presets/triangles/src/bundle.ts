import { loadTrianglesPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadTrianglesPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTrianglesPreset?: typeof loadTrianglesPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadTrianglesPreset = loadTrianglesPreset;

globalObject.tsParticles = tsParticles;
