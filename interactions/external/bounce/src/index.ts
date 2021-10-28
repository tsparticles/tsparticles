import type { Main } from "tsparticles-engine";
import { Bouncer } from "./Bouncer";

export async function loadExternalBounceInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalBounce", (container) => new Bouncer(container));
}
