import type { Main } from "tsparticles-engine";
import { Bubbler } from "./Bubbler";

export async function loadExternalBubbleInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalBubble", (container) => new Bubbler(container));
}
