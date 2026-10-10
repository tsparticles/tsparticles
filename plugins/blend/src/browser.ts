import { loadBlendPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBlendPlugin?: typeof loadBlendPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBlendPlugin = loadBlendPlugin;

export * from "./index.js";
