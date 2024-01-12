import { type Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadAbsorbersPlugin(engine: Engine, refresh = true): Promise<void> {
    const { AbsorbersPlugin } = await import("./AbsorbersPlugin.js");

    await engine.addPlugin(new AbsorbersPlugin(), refresh);
}

export * from "./AbsorberContainer.js";
export * from "./Enums/AbsorberClickMode.js";
