import type { Engine } from "tsparticles-engine";
import { Grabber } from "./Grabber";

/**
 * @param engine - The engine to load the interaction for.
 * @param refresh -
 */
export async function loadExternalGrabInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalGrab", (container) => new Grabber(container), refresh);
}

export * from "./Options/Classes/Grab";
export * from "./Options/Classes/GrabLinks";
export * from "./Options/Interfaces/IGrab";
export * from "./Options/Interfaces/IGrabLinks";
