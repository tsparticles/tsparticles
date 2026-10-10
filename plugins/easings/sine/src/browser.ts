import { loadEasingSinePlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingSinePlugin?: typeof loadEasingSinePlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingSinePlugin = loadEasingSinePlugin;

export * from "./index.js";
