import { loadPaintUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPaintUpdater?: typeof loadPaintUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPaintUpdater = loadPaintUpdater;

export * from "./index.js";
