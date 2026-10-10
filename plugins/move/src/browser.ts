import { loadMovePlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadMovePlugin?: typeof loadMovePlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadMovePlugin = loadMovePlugin;

export * from "./index.js";
