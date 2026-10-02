import { loadSnowfallPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSnowfallPalette?: typeof loadSnowfallPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSnowfallPalette = loadSnowfallPalette;

export * from "./index.js";
