import { loadEasingQuadPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingQuadPlugin?: typeof loadEasingQuadPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingQuadPlugin = loadEasingQuadPlugin;

export * from "./index.js";
