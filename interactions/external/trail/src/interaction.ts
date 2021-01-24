import type { Main } from "tsparticles-core";
import { TrailMaker } from "./TrailMaker";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new TrailMaker(container));
}
