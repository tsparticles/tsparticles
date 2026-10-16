import { loadPortalPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPortalPalette?: typeof loadPortalPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPortalPalette = loadPortalPalette;

export * from "./index.js";
