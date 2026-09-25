import { loadBulletHitPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBulletHitPalette?: typeof loadBulletHitPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBulletHitPalette = loadBulletHitPalette;

export * from "./index.js";
