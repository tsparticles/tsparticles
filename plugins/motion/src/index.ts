import { type Engine } from "@tsparticles/engine";
import { MotionPlugin } from "./MotionPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadMotionPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new MotionPlugin(), refresh);
}
