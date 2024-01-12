import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCanvasMaskPlugin(engine: Engine, refresh = true): Promise<void> {
    const { CanvasMaskPlugin } = await import("./CanvasMaskPlugin.js");

    await engine.addPlugin(new CanvasMaskPlugin(), refresh);
}
