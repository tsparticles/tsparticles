import { loadFireworksSilverStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksSilverStrokePalette?: typeof loadFireworksSilverStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksSilverStrokePalette = loadFireworksSilverStrokePalette;

export * from "./index.js";
