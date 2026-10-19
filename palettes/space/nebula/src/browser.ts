import { loadNebulaPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadNebulaPalette?: typeof loadNebulaPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadNebulaPalette = loadNebulaPalette;

export * from "./index.js";
