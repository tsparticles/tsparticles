import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRoundedPolygonShape(engine: Engine, refresh = true): Promise<void> {
    const { RoundedPolygonDrawer } = await import("./RoundedPolygonDrawer.js");

    await engine.addShape("rounded-polygon", new RoundedPolygonDrawer(), refresh);
}
