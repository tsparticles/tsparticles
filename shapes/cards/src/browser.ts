import { loadCardsShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCardsShape?: typeof loadCardsShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCardsShape = loadCardsShape;

export * from "./index.js";
