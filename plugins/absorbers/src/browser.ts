import { loadAbsorbersPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAbsorbersPlugin?: typeof loadAbsorbersPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAbsorbersPlugin = loadAbsorbersPlugin;

export * from "./index.js";
