import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPathShape(engine: Engine, refresh = true): Promise<void> {
    const { PathDrawer } = await import("./PathDrawer.js");

    await engine.addShape("path", new PathDrawer(), refresh);
}
