import { loadFireworksPurpleStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksPurpleStrokePalette?: typeof loadFireworksPurpleStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksPurpleStrokePalette = loadFireworksPurpleStrokePalette;

export * from "./index.js";
