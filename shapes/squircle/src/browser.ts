import { loadSquircleShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadSquircleShape?: typeof loadSquircleShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadSquircleShape = loadSquircleShape;

export * from "./index.js";
