import { loadMonochromeBrownPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeBrownPalette?: typeof loadMonochromeBrownPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeBrownPalette = loadMonochromeBrownPalette;

export * from "./index.js";
