import { loadHslColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHslColorPlugin?: typeof loadHslColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHslColorPlugin = loadHslColorPlugin;

export * from "./index.js";
