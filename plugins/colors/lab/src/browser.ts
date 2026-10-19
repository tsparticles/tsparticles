import { loadLabColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLabColorPlugin?: typeof loadLabColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLabColorPlugin = loadLabColorPlugin;

export * from "./index.js";
