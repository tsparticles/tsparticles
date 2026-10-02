import { loadFireworksPurplePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksPurplePalette?: typeof loadFireworksPurplePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksPurplePalette = loadFireworksPurplePalette;

export * from "./index.js";
