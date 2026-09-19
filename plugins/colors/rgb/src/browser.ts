import { loadRgbColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRgbColorPlugin?: typeof loadRgbColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRgbColorPlugin = loadRgbColorPlugin;

export * from "./index.js";
