import { loadOutModesUpdater } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadOutModesUpdater?: typeof loadOutModesUpdater;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadOutModesUpdater = loadOutModesUpdater;

export * from "./index.js";
