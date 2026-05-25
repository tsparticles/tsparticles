import { loadRibbonShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRibbonShape?: typeof loadRibbonShape;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRibbonShape = loadRibbonShape;

export * from "./index.js";
