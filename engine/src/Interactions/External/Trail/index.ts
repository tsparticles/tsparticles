import type { Main } from "../../../main";
import { TrailMaker } from "./TrailMaker";

export async function loadExternalTrailInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
