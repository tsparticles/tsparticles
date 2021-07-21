import type { Main } from "../../main";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";

export function loadOutModesUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container));
}
