import { loadLifeUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLifeUpdater?: typeof loadLifeUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLifeUpdater = loadLifeUpdater;

export * from "./index.js";
