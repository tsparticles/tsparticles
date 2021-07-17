import type { Main } from "../../main";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

export function loadStrokeColorUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("strokeColor", () => new StrokeColorUpdater());
}
