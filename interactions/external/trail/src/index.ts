import type { Engine } from "tsparticles-engine";
import { TrailMaker } from "./TrailMaker";

export async function loadExternalTrailInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
