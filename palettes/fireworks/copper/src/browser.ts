import { loadFireworksCopperPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksCopperPalette?: typeof loadFireworksCopperPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksCopperPalette = loadFireworksCopperPalette;

export * from "./index.js";
