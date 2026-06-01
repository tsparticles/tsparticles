export * from "@tsparticles/engine";
import { loadBasic } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export { loadBasic } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBasic?: typeof loadBasic;
  tsParticles?: typeof tsParticles;
};

globalObject.loadBasic = loadBasic;

globalObject.tsParticles = tsParticles;
