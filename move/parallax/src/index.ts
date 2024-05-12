import type { Engine } from "@tsparticles/engine";
import { ParallaxMover } from "./ParallaxMover.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParallaxMover(engine: Engine, refresh = true): Promise<void> {
    await engine.addMover(
        "parallax",
        () => {
            return Promise.resolve(new ParallaxMover());
        },
        refresh,
    );
}
