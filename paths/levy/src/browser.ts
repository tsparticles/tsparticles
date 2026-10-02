import { loadLevyPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLevyPath?: typeof loadLevyPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLevyPath = loadLevyPath;

export * from "./index.js";
