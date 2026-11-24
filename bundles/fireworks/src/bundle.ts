import { createEngine } from "@tsparticles/engine";
import { createFireworks } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  createFireworks?: typeof createFireworks;
  tsParticles?: { createEngine?: typeof createEngine };
};

globalObject.createFireworks = createFireworks;
Object.assign((globalObject.tsParticles ??= {}), { createEngine });

export * from "./index.js";
export * from "@tsparticles/engine";
