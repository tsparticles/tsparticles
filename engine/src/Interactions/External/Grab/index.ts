import type { Main } from "../../../main";
import { Grabber } from "./Grabber";

export async function loadExternalGrabInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalGrab", (container) => new Grabber(container));
}
