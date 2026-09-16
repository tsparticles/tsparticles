import { loadNamedColorPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadNamedColorPlugin?: typeof loadNamedColorPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadNamedColorPlugin = loadNamedColorPlugin;

export * from "./index.js";
