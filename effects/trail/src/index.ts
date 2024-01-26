import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTrailEffect(engine: Engine, refresh = true): Promise<void> {
    const { TrailDrawer } = await import("./TrailDrawer.js");

    await engine.addEffect("trail", new TrailDrawer(), refresh);
}
