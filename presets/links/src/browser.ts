import { loadLinksPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadLinksPreset?: typeof loadLinksPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadLinksPreset = loadLinksPreset;

export * from "./index.js";
