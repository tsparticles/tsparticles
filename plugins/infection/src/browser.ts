import { loadInfectionPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadInfectionPlugin?: typeof loadInfectionPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadInfectionPlugin = loadInfectionPlugin;

export * from "./index.js";
