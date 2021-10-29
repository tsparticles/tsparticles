import type { Main } from "tsparticles-engine";
import { TrailMaker } from "./TrailMaker";

export async function loadExternalTrailInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
