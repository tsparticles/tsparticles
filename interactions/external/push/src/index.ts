import type { Engine } from "@tsparticles/engine";
import { Pusher } from "./Pusher.js";

/**
 * @param engine - The engine to use for the interaction
 * @param refresh -
 */
export async function loadExternalPushInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalPush",
        container => {
            return Promise.resolve(new Pusher(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Push.js";
export * from "./Options/Interfaces/IPush.js";
