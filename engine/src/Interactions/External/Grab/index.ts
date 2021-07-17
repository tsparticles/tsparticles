import type { Main } from "../../../main";
import { Grabber } from "./Grabber";

export function loadExternalGrabInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalGrab", (container) => new Grabber(container));
}
