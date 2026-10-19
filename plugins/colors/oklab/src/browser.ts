import { loadOklabColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadOklabColorPlugin?: typeof loadOklabColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadOklabColorPlugin = loadOklabColorPlugin;

export * from "./index.js";
