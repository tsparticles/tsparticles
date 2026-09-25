import { loadBrownianPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBrownianPath?: typeof loadBrownianPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBrownianPath = loadBrownianPath;

export * from "./index.js";
