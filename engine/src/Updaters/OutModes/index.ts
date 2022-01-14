import type { Engine } from "../../engine";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";

export async function loadOutModesUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container));
}
