import type { Main } from "../../../main";
import { TrailMaker } from "./TrailMaker";

export function loadExternalTrailInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
