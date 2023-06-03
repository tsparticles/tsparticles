import type { Engine } from "tsparticles-engine";
import { PolygonDrawer } from "./PolygonDrawer";
import { TriangleDrawer } from "./TriangleDrawer";

/**
 * @param engine
 */
export async function loadGenericPolygonShape(engine: Engine): Promise<void> {
    await engine.addShape("polygon", new PolygonDrawer());
}

/**
 * @param engine
 */
export async function loadTriangleShape(engine: Engine): Promise<void> {
    await engine.addShape("triangle", new TriangleDrawer());
}

/**
 * @param engine
 */
export async function loadPolygonShape(engine: Engine): Promise<void> {
    await loadGenericPolygonShape(engine);
    await loadTriangleShape(engine);
}
