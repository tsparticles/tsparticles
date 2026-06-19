import { loadGifShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGifShape?: typeof loadGifShape;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGifShape = loadGifShape;

export * from "./index.js";
