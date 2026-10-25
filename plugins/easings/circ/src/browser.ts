import { loadEasingCircPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingCircPlugin?: typeof loadEasingCircPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingCircPlugin = loadEasingCircPlugin;

export * from "./index.js";
