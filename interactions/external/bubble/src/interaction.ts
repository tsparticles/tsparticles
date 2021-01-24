import type { Main } from "tsparticles-core";
import { Bubbler } from "./Bubbler";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Bubbler(container));
}
