import { createEngine } from "@tsparticles/engine";
import { loadLinksPreset } from "./index.js";
export { loadLinksPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLinksPreset?: typeof loadLinksPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadLinksPreset = loadLinksPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
