import { loadCanvasMaskPlugin } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadCanvasMaskPlugin?: typeof loadCanvasMaskPlugin;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadCanvasMaskPlugin = loadCanvasMaskPlugin;

export * from "./index.js";
