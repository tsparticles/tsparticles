import type { Engine } from "tsparticles-engine";
import { Bubbler } from "./Bubbler";

export async function loadExternalBubbleInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("externalBubble", (container) => new Bubbler(container));
}
