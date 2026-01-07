import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadParallaxMover(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addMover("parallax", async () => {
            const { ParallaxMover } = await import("./ParallaxMover.js");

            return new ParallaxMover();
        });
    });
}
