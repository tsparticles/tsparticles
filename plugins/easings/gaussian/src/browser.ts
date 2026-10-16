import { loadEasingGaussianPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadEasingGaussianPlugin?: typeof loadEasingGaussianPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadEasingGaussianPlugin = loadEasingGaussianPlugin;

export * from "./index.js";
