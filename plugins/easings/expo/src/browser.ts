import { loadEasingExpoPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingExpoPlugin?: typeof loadEasingExpoPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingExpoPlugin = loadEasingExpoPlugin;

export * from "./index.js";
