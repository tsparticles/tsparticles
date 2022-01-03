import type { Engine } from "../../../engine";
import { Grabber } from "./Grabber";

export async function loadExternalGrabInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("externalGrab", (container) => new Grabber(container));
}
