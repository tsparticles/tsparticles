import { loadRandomPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRandomPath?: typeof loadRandomPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRandomPath = loadRandomPath;

export * from "./index.js";
