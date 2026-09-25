import { loadBranchesPath } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadBranchesPath?: typeof loadBranchesPath;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadBranchesPath = loadBranchesPath;

export * from "./index.js";
