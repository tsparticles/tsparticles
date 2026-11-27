import { createEngine } from "@tsparticles/engine";
import { loadTrianglesPreset } from "./index.js";
export { loadTrianglesPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTrianglesPreset?: typeof loadTrianglesPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadTrianglesPreset = loadTrianglesPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
