import type { AbsorberContainer } from "./AbsorberContainer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadAbsorbersPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { AbsorbersPlugin } = await import("./AbsorbersPlugin.js");

        e.addPlugin(new AbsorbersPlugin(e));
        e.addInteractor("externalAbsorbers", async container => {
            const { AbsorbersInteractor } = await import("./AbsorbersInteractor.js");

            return new AbsorbersInteractor(e, container as AbsorberContainer);
        });
    });
}

export type * from "./AbsorberContainer.js";
