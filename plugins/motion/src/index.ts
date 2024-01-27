import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadMotionPlugin(engine: Engine, refresh = true): Promise<void> {
    const { MotionPlugin } = await import("./MotionPlugin.js");

    await engine.addPlugin(new MotionPlugin(engine), refresh);
}
