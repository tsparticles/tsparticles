import { type Engine } from "@tsparticles/engine";
import { ShadowDrawer } from "./ShadowDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadShadowEffect(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addEffect("shadow", new ShadowDrawer(engine), refresh);
}
