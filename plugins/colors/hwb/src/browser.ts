import { loadHwbColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHwbColorPlugin?: typeof loadHwbColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHwbColorPlugin = loadHwbColorPlugin;

export * from "./index.js";
