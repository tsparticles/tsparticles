import { getLogger, setLogger } from "./Utils/LogUtils.js";
import { getRandom, getRandomFn, setRandom } from "./Utils/MathUtils.js";
import { tsParticles } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  getParticlesLogger?: typeof getLogger;
  getParticlesRandom?: typeof getRandom;
  getParticlesRandomFn?: typeof getRandomFn;
  setParticlesLogger?: typeof setLogger;
  setParticlesRandom?: typeof setRandom;
  tsParticles?: typeof tsParticles;
};
globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.tsParticles = tsParticles;
globalObject.getParticlesLogger = getLogger;
globalObject.setParticlesLogger = setLogger;
globalObject.getParticlesRandom = getRandom;
globalObject.getParticlesRandomFn = getRandomFn;
globalObject.setParticlesRandom = setRandom;

export * from "./index.js";
