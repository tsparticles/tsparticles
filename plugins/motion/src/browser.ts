import { loadMotionPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMotionPlugin?: typeof loadMotionPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMotionPlugin = loadMotionPlugin;

export * from "./index.js";
