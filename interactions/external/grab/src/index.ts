import type { Engine } from "@tsparticles/engine";
import { Grabber } from "./Grabber.js";

/**
 * @param engine - The engine to load the interaction for.
 * @param refresh -
 */
export async function loadExternalGrabInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalGrab",
        container => {
            return Promise.resolve(new Grabber(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Grab.js";
export * from "./Options/Classes/GrabLinks.js";
export * from "./Options/Interfaces/IGrab.js";
export * from "./Options/Interfaces/IGrabLinks.js";
