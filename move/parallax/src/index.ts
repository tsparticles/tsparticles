import type { Engine } from "tsparticles-engine";
import { ParallaxMover } from "./ParallaxMover";

export async function loadParallaxMover(engine: Engine) {
    engine.addMover("parallax", () => new ParallaxMover());
}
