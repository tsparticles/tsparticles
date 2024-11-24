import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { AbsorbersPlugin } from "./AbsorbersPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadAbsorbersPlugin(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPlugin(new AbsorbersPlugin(engine), refresh);
}

export * from "./AbsorberContainer.js";
export * from "./Enums/AbsorberClickMode.js";
