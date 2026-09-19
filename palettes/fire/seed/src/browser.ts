import { loadFireSeedPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireSeedPalette?: typeof loadFireSeedPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireSeedPalette = loadFireSeedPalette;

export * from "./index.js";
