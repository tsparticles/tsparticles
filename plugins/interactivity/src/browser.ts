import { loadInteractivityPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadInteractivityPlugin?: typeof loadInteractivityPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadInteractivityPlugin = loadInteractivityPlugin;

export * from "./index.js";
