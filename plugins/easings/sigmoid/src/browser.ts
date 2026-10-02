import { loadEasingSigmoidPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingSigmoidPlugin?: typeof loadEasingSigmoidPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingSigmoidPlugin = loadEasingSigmoidPlugin;

export * from "./index.js";
