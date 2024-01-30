import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLineShape(engine: Engine, refresh = true): Promise<void> {
    const { LineDrawer } = await import("./LineDrawer.js");

    await engine.addShape("line", new LineDrawer(), refresh);
}
