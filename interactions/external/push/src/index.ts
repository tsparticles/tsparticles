import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 */
export function loadExternalPushInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalPush", async container => {
            const { Pusher } = await import("./Pusher.js");

            return new Pusher(container);
        });
    });
}

export * from "./Options/Classes/Push.js";
export type * from "./Options/Interfaces/IPush.js";
