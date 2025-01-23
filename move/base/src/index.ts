import { BaseMover } from "./BaseMover.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBaseMover(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addMover(
        "base",
        () => {
            return Promise.resolve(new BaseMover());
        },
        refresh,
    );
}
