import { loadInfinityShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadInfinityShape?: typeof loadInfinityShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadInfinityShape = loadInfinityShape;

export * from "./index.js";
