import { loadFireworksCopperStrokePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireworksCopperStrokePalette?: typeof loadFireworksCopperStrokePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireworksCopperStrokePalette = loadFireworksCopperStrokePalette;

export * from "./index.js";
