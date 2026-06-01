import { loadFireworksPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadFireworksPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksPreset?: typeof loadFireworksPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadFireworksPreset = loadFireworksPreset;

globalObject.tsParticles = tsParticles;
