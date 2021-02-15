import type { Main } from "tsparticles-core";
import { Bouncer } from "./Bouncer";

export function loadExternalBounceInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalBounce", (container) => new Bouncer(container));
}
