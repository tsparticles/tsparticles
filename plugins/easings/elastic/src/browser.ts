import { loadEasingElasticPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingElasticPlugin?: typeof loadEasingElasticPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingElasticPlugin = loadEasingElasticPlugin;

export * from "./index.js";
