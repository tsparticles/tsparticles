import { loadLchColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLchColorPlugin?: typeof loadLchColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLchColorPlugin = loadLchColorPlugin;

export * from "./index.js";
