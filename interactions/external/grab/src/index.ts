import type { Engine } from "tsparticles-engine";
import { Grabber } from "./Grabber";

export async function loadExternalGrabInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("externalGrab", (container) => new Grabber(container));
}
