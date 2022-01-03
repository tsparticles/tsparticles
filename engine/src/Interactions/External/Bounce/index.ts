import type { Engine } from "../../../engine";
import { Bouncer } from "./Bouncer";

export async function loadExternalBounceInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("externalBounce", (container) => new Bouncer(container));
}
