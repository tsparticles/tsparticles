import { createEngine } from "@tsparticles/engine";
import { createRibbons } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  createRibbons?: typeof createRibbons;
  tsParticles?: { createEngine: typeof createEngine };
};

globalObject.createRibbons = createRibbons;
globalObject.tsParticles = { ...globalObject.tsParticles, createEngine };

export * from "./index.js";
export * from "@tsparticles/engine";
