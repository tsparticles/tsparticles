import { AbsorbersPlugin } from "./AbsorbersPlugin.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadAbsorbersPlugin(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new AbsorbersPlugin(engine), refresh);
}

export type * from "./AbsorberContainer.js";
export * from "./Enums/AbsorberClickMode.js";
