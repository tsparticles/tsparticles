import type { Main } from "tsparticles-core";
import { Grabber } from "./Grabber";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Grabber(container));
}
