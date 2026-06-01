import { loadFireflyPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadFireflyPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireflyPreset?: typeof loadFireflyPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadFireflyPreset = loadFireflyPreset;

globalObject.tsParticles = tsParticles;
