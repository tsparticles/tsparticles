import { loadDualityGreenMagentaPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadDualityGreenMagentaPalette?: typeof loadDualityGreenMagentaPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadDualityGreenMagentaPalette = loadDualityGreenMagentaPalette;

export * from "./index.js";
