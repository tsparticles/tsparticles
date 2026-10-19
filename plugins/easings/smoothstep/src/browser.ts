import { loadEasingSmoothstepPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingSmoothstepPlugin?: typeof loadEasingSmoothstepPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingSmoothstepPlugin = loadEasingSmoothstepPlugin;

export * from "./index.js";
