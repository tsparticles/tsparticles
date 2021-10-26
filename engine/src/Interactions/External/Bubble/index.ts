import type { Main } from "../../../main";
import { Bubbler } from "./Bubbler";

export async function loadExternalBubbleInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalBubble", (container) => new Bubbler(container));
}
