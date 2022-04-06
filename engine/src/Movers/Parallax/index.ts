import type { Engine } from "../../engine";
import { ParallaxMover } from "./ParallaxMover";

export async function loadParallaxMover(engine: Engine): Promise<void> {
    engine.addMover("parallax", () => new ParallaxMover());
}
