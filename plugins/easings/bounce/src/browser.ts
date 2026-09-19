import { loadEasingBouncePlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingBouncePlugin?: typeof loadEasingBouncePlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingBouncePlugin = loadEasingBouncePlugin;

export * from "./index.js";
