import { loadResponsivePlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadResponsivePlugin?: typeof loadResponsivePlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadResponsivePlugin = loadResponsivePlugin;

export * from "./index.js";
