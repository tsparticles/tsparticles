import type { Main } from "tsparticles-engine";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";

export async function loadOutModesUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container));
}
