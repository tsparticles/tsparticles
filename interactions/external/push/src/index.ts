import type { Main } from "tsparticles-engine";
import { Pusher } from "./Pusher";

export function loadExternalPushInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalPush", (container) => new Pusher(container));
}
