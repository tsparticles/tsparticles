import type { Engine } from "tsparticles-engine";
import { TrailMaker } from "./TrailMaker";

export async function loadExternalTrailInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
