import { loadStarShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadStarShape?: typeof loadStarShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadStarShape = loadStarShape;

export * from "./index.js";
