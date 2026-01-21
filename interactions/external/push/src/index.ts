import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export function loadExternalPushInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        loadInteractivityPlugin(e);

        e.addInteractor?.("externalPush", async container => {
            const { Pusher } = await import("./Pusher.js");

            return new Pusher(container);
        });
    });
}

export * from "./Options/Classes/Push.js";
export type * from "./Options/Interfaces/IPush.js";
