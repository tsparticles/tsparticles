import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { ParallaxMover } from "./ParallaxMover.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParallaxMover(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addMover(
        "parallax",
        () => {
            return Promise.resolve(new ParallaxMover());
        },
        refresh,
    );
}
