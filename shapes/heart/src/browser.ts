import { loadHeartShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHeartShape?: typeof loadHeartShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHeartShape = loadHeartShape;

export * from "./index.js";
