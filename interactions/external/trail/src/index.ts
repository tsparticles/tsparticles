import type { Main } from "tsparticles-engine";
import { TrailMaker } from "./TrailMaker";

export function loadTrailInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
