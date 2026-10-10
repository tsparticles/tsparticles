import { loadRoundedPolygonShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadRoundedPolygonShape?: typeof loadRoundedPolygonShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadRoundedPolygonShape = loadRoundedPolygonShape;

export * from "./index.js";
