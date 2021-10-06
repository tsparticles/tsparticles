import type { Main } from "tsparticles-engine";
import { Grabber } from "./Grabber";

export function loadExternalGrabInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalGrab", (container) => new Grabber(container));
}
