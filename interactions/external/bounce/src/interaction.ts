import type { Main } from "tsparticles-core";
import { Bouncer } from "./Bouncer";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Bouncer(container));
}
