import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadGenericPolygonShape(engine: Engine, refresh = true): Promise<void> {
    const { PolygonDrawer } = await import("./PolygonDrawer.js");

    await engine.addShape("polygon", new PolygonDrawer(), refresh);
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTriangleShape(engine: Engine, refresh = true): Promise<void> {
    const { TriangleDrawer } = await import("./TriangleDrawer.js");

    await engine.addShape("triangle", new TriangleDrawer(), refresh);
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPolygonShape(engine: Engine, refresh = true): Promise<void> {
    await loadGenericPolygonShape(engine, refresh);
    await loadTriangleShape(engine, refresh);
}
