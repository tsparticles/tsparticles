import { loadFireflyPreset } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadFireflyPreset?: typeof loadFireflyPreset;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadFireflyPreset = loadFireflyPreset;

export * from "./index.js";
