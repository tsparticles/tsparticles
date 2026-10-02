import { loadIrisPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadIrisPalette?: typeof loadIrisPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadIrisPalette = loadIrisPalette;

export * from "./index.js";
