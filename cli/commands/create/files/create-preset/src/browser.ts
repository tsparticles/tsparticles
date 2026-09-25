import { loadTemplatePreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTemplatePreset?: typeof loadTemplatePreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTemplatePreset = loadTemplatePreset;

export * from "./index.js";
