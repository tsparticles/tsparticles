import { loadMonochromeSilverPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeSilverPalette?: typeof loadMonochromeSilverPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeSilverPalette = loadMonochromeSilverPalette;

export * from "./index.js";
