import { ribbons } from "./index.js";
import { tsParticles } from "@tsparticles/engine";
export * from "./index.js";
export * from "@tsparticles/engine";

const globalObject = globalThis as typeof globalThis & {
  ribbons?: typeof ribbons;
  tsParticles?: typeof tsParticles;
};
globalObject.ribbons = ribbons;

globalObject.tsParticles = tsParticles;
