import { loadEasingQuartPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingQuartPlugin?: typeof loadEasingQuartPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingQuartPlugin = loadEasingQuartPlugin;

export * from "./index.js";
