import { BackgroundMaskPlugin } from "./BackgroundMaskPlugin.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 * @param refresh -
 */
export async function loadBackgroundMaskPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new BackgroundMaskPlugin(engine), refresh);
}
