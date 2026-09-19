import { loadAutumnLeavesPalette } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadAutumnLeavesPalette?: typeof loadAutumnLeavesPalette;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadAutumnLeavesPalette = loadAutumnLeavesPalette;

export * from "./index.js";
