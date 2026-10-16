import { loadTemplatePreset } from "./index.js";
import { tsParticles } from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTemplatePreset?: typeof loadTemplatePreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTemplatePreset = loadTemplatePreset;

export { loadTemplatePreset, tsParticles };
