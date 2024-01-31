import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParallaxMover(engine: Engine, refresh = true): Promise<void> {
    await engine.addMover(
        "parallax",
        async () => {
            const { ParallaxMover } = await import("./ParallaxMover.js");

            return new ParallaxMover();
        },
        refresh,
    );
}
