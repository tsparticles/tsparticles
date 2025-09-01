import { type Engine } from "@tsparticles/engine";
import { Grabber } from "./Grabber.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the interaction for.
 * @param refresh -
 */
export async function loadExternalGrabInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "externalGrab",
        container => {
            return Promise.resolve(new Grabber(container, engine));
        },
        refresh,
    );
}

export * from "./Options/Classes/Grab.js";
export * from "./Options/Classes/GrabLinks.js";
export type * from "./Options/Interfaces/IGrab.js";
export type * from "./Options/Interfaces/IGrabLinks.js";
