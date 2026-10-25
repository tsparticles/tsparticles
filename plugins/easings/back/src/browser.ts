import { loadEasingBackPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingBackPlugin?: typeof loadEasingBackPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingBackPlugin = loadEasingBackPlugin;

export * from "./index.js";
