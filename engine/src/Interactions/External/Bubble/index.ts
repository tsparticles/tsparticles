import type { Main } from "../../../main";
import { Bubbler } from "./Bubbler";

export function loadExternalBubbleInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalBubble", (container) => new Bubbler(container));
}
