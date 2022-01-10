import type { Engine } from "tsparticles-engine";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";

export async function loadOutModesUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container));
}
