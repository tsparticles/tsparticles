import { loadSpiralShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSpiralShape?: typeof loadSpiralShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSpiralShape = loadSpiralShape;

export * from "./index.js";
