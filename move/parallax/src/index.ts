import type { Engine } from "tsparticles-engine";

export async function loadParallaxMover(engine: Engine) {
    engine.addMover("parallax", () => undefined);
}
