import type { Main } from "tsparticles-core";
import { OutOfCanvasUpdater } from "./OutOfCanvasUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new OutOfCanvasUpdater(container));
}
