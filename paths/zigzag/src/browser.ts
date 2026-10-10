import { loadZigZagPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadZigZagPath?: typeof loadZigZagPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadZigZagPath = loadZigZagPath;

export * from "./index.js";
