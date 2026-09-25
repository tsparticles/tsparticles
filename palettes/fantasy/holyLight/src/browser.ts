import { loadHolyLightPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadHolyLightPalette?: typeof loadHolyLightPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadHolyLightPalette = loadHolyLightPalette;

export * from "./index.js";
