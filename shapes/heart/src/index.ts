import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadHeartShape(engine: Engine, refresh = true): Promise<void> {
    const { HeartDrawer } = await import("./HeartDrawer.js");

    await engine.addShape("heart", new HeartDrawer(), refresh);
}
