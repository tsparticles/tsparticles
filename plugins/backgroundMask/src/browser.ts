import { loadBackgroundMaskPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBackgroundMaskPlugin?: typeof loadBackgroundMaskPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBackgroundMaskPlugin = loadBackgroundMaskPlugin;

export * from "./index.js";
