import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadArrowShape(engine: Engine, refresh = true): Promise<void> {
    const { ArrowDrawer } = await import("./ArrowDrawer.js");

    await engine.addShape("arrow", new ArrowDrawer(), refresh);
}
