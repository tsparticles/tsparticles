import { loadRoundedRectShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRoundedRectShape?: typeof loadRoundedRectShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRoundedRectShape = loadRoundedRectShape;

export * from "./index.js";
