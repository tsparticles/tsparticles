import { loadOklchColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadOklchColorPlugin?: typeof loadOklchColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadOklchColorPlugin = loadOklchColorPlugin;

export * from "./index.js";
