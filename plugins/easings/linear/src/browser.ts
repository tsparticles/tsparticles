import { loadEasingLinearPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingLinearPlugin?: typeof loadEasingLinearPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingLinearPlugin = loadEasingLinearPlugin;

export * from "./index.js";
