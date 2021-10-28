import type { Main } from "tsparticles-engine";
import { Grabber } from "./Grabber";

export async function loadExternalGrabInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalGrab", (container) => new Grabber(container));
}
