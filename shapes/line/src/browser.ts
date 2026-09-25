import { loadLineShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLineShape?: typeof loadLineShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLineShape = loadLineShape;

export * from "./index.js";
