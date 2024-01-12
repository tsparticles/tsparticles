import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCircleShape(engine: Engine, refresh = true): Promise<void> {
    const { CircleDrawer } = await import("./CircleDrawer.js");

    await engine.addShape("circle", new CircleDrawer(), refresh);
}
