import type { Engine } from "@tsparticles/engine";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";

/**
 *
 * @param engine
 */
export async function loadOutModesUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container));
}
