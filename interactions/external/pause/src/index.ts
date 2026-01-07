import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalPauseInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalPause", async container => {
            const { Pauser } = await import("./Pauser.js");

            return new Pauser(container);
        });
    });
}
