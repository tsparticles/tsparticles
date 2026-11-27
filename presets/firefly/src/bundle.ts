import { createEngine } from "@tsparticles/engine";
import { loadFireflyPreset } from "./index.js";
export { loadFireflyPreset } from "./index.js";
export { createEngine };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireflyPreset?: typeof loadFireflyPreset;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.loadFireflyPreset = loadFireflyPreset;

globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };
