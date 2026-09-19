import { loadMonochromeCyanPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMonochromeCyanPalette?: typeof loadMonochromeCyanPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMonochromeCyanPalette = loadMonochromeCyanPalette;

export * from "./index.js";
