import { loadEasingCubicPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingCubicPlugin?: typeof loadEasingCubicPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingCubicPlugin = loadEasingCubicPlugin;

export * from "./index.js";
