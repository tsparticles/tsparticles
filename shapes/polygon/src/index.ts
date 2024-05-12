import type { Engine } from "@tsparticles/engine";
import { PolygonDrawer } from "./PolygonDrawer.js";
import { TriangleDrawer } from "./TriangleDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadGenericPolygonShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new PolygonDrawer(), refresh);
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTriangleShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new TriangleDrawer(), refresh);
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPolygonShape(engine: Engine, refresh = true): Promise<void> {
    await loadGenericPolygonShape(engine, refresh);
    await loadTriangleShape(engine, refresh);
}
