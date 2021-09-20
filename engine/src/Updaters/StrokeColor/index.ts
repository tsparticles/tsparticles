import type { Main } from "../../main";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

export function loadStrokeColorUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container));
}
