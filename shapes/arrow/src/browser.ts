import { loadArrowShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadArrowShape?: typeof loadArrowShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadArrowShape = loadArrowShape;

export * from "./index.js";
