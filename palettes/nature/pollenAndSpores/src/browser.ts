import { loadPollenAndSporesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadPollenAndSporesPalette?: typeof loadPollenAndSporesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadPollenAndSporesPalette = loadPollenAndSporesPalette;

export * from "./index.js";
