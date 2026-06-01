import { loadConfettiFallingPreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadConfettiFallingPreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadConfettiFallingPreset?: typeof loadConfettiFallingPreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadConfettiFallingPreset = loadConfettiFallingPreset;

globalObject.tsParticles = tsParticles;
