import type { Engine } from "tsparticles-engine";
import { RoundedPolygonDrawer } from "./RoundedPolygonDrawer";
import { TriangleDrawer } from "./RoundedTriangleDrawer";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadGenericRoundedPolygonShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape("rounded-polygon", new RoundedPolygonDrawer(), refresh);
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTriangleShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape("triangle", new TriangleDrawer(), refresh);
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedPolygonShape(engine: Engine, refresh = true): Promise<void> {
    await loadGenericRoundedPolygonShape(engine, refresh);
    await loadTriangleShape(engine, refresh);
}
