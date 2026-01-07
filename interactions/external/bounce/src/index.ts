import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalBounceInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalBounce", async container => {
            const { Bouncer } = await import("./Bouncer.js");

            return new Bouncer(container);
        });
    });
}

export * from "./Options/Classes/Bounce.js";
export type * from "./Options/Interfaces/IBounce.js";
