import { loadSoundsPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSoundsPlugin?: typeof loadSoundsPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSoundsPlugin = loadSoundsPlugin;

export * from "./index.js";
