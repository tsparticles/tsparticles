import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSpiralShape(engine: Engine, refresh = true): Promise<void> {
    const { SpiralDrawer } = await import("./SpiralDrawer.js");

    await engine.addShape("spiral", new SpiralDrawer(), refresh);
}
