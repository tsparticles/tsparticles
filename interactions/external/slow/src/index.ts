import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalSlowInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalSlow", async container => {
            const { Slower } = await import("./Slower.js");

            return new Slower(container);
        });
    });
}

export * from "./Options/Classes/Slow.js";
export type * from "./Options/Interfaces/ISlow.js";
