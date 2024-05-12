import type { Engine } from "@tsparticles/engine";
import { MotionPlugin } from "./MotionPlugin.js";

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadMotionPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new MotionPlugin(engine), refresh);
}
