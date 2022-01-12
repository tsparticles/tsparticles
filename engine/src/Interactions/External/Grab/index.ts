import type { Engine } from "../../../engine";
import { Grabber } from "./Grabber";

export async function loadExternalGrabInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalGrab", (container) => new Grabber(container));
}
