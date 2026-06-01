import { loadSeaAnemonePreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadSeaAnemonePreset } from "./index.js";
export { tsParticles };

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSeaAnemonePreset?: typeof loadSeaAnemonePreset;
  tsParticles?: typeof tsParticles;
};

globalObject.loadSeaAnemonePreset = loadSeaAnemonePreset;

globalObject.tsParticles = tsParticles;
