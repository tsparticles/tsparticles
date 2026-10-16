import { loadStarsPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadStarsPreset?: typeof loadStarsPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadStarsPreset = loadStarsPreset;

export * from "./index.js";
