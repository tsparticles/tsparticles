import { loadTrailPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadTrailPlugin?: typeof loadTrailPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadTrailPlugin = loadTrailPlugin;

export * from "./index.js";
