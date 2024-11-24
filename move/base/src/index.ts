import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { BaseMover } from "./BaseMover.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBaseMover(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addMover(
        "base",
        () => {
            return Promise.resolve(new BaseMover());
        },
        refresh,
    );
}
