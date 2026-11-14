import { createEngine } from "@tsparticles/engine";
import { loadFireworksPreset } from "./index.js";
export { loadFireworksPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksPreset?: typeof loadFireworksPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadFireworksPreset = loadFireworksPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
