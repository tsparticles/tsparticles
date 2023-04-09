import type { Engine } from "tsparticles-engine";
import { ParallaxMover } from "./ParallaxMover";

/**
 *
 * @param engine
 */
export async function loadParallaxMover(engine: Engine): Promise<void> {
    engine.addMover("parallax", () => new ParallaxMover());
}
