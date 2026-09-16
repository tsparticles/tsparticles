import { loadColoredSmokePurplePalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadColoredSmokePurplePalette?: typeof loadColoredSmokePurplePalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadColoredSmokePurplePalette = loadColoredSmokePurplePalette;

export * from "./index.js";
