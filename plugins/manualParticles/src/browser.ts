import { loadManualParticlesPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadManualParticlesPlugin?: typeof loadManualParticlesPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadManualParticlesPlugin = loadManualParticlesPlugin;

export * from "./index.js";
