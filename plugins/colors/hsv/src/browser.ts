import { loadHsvColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHsvColorPlugin?: typeof loadHsvColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHsvColorPlugin = loadHsvColorPlugin;

export * from "./index.js";
