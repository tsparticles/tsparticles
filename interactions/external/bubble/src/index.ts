import type { Main } from "tsparticles-engine";
import { Bubbler } from "./Bubbler";

export function loadExternalBubbleInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalBubble", (container) => new Bubbler(container));
}
