import { loadGenericPolygonShape, loadPolygonShape, loadTriangleShape } from "./index.js";

const globalObject = globalThis as typeof globalThis & {
  __tsParticlesInternals?: Record<string, unknown>;
  loadGenericPolygonShape?: typeof loadGenericPolygonShape;
  loadPolygonShape?: typeof loadPolygonShape;
  loadTriangleShape?: typeof loadTriangleShape;
};

globalObject.__tsParticlesInternals = globalObject.__tsParticlesInternals ?? {};
globalObject.loadGenericPolygonShape = loadGenericPolygonShape;
globalObject.loadPolygonShape = loadPolygonShape;
globalObject.loadTriangleShape = loadTriangleShape;

export * from "./index.js";
