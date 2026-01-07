import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalPopInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalPop", async container => {
            const { Popper } = await import("./Popper.js");

            return new Popper(container);
        });
    });
}
