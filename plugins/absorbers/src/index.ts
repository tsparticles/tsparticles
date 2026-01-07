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
    });
}

export type * from "./AbsorberContainer.js";
export * from "./Enums/AbsorberClickMode.js";
