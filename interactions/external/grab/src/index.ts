import type { Engine } from "tsparticles-engine";
import { Grabber } from "./Grabber";

export async function loadExternalGrabInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalGrab", (container) => new Grabber(container));
}

export * from "./Options/Classes/Grab";
export * from "./Options/Classes/GrabLinks";
export * from "./Options/Interfaces/IGrab";
export * from "./Options/Interfaces/IGrabLinks";
