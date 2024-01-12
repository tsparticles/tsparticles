import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTextShape(engine: Engine, refresh = true): Promise<void> {
    const { TextDrawer, validTypes } = await import("./TextDrawer.js");

    await engine.addShape(validTypes, new TextDrawer(), refresh);
}
