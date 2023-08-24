import type { Engine } from "@tsparticles/engine";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";

/**
 * @param engine - The engine instance loading this plugin
 * @param refresh -
 */
export async function loadOutModesUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container), refresh);
}
