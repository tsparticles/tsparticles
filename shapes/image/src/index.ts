import type { Engine } from "tsparticles-engine";
import { ImageDrawer } from "./ImageDrawer";

/**
 * Loads the image shape in the given engine
 * @param engine the engine where the image shape is going to be added
 */
export async function loadImageShape(engine: Engine): Promise<void> {
    await engine.addShape(["image", "images"], new ImageDrawer());
}
