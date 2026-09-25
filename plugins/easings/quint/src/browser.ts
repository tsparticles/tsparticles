import { loadEasingQuintPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingQuintPlugin?: typeof loadEasingQuintPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingQuintPlugin = loadEasingQuintPlugin;

export * from "./index.js";
