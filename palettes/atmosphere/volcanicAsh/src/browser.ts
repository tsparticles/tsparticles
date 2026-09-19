import { loadVolcanicAshPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadVolcanicAshPalette?: typeof loadVolcanicAshPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadVolcanicAshPalette = loadVolcanicAshPalette;

export * from "./index.js";
