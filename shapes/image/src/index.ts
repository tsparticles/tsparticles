import type { Engine } from "tsparticles-engine";
import { ImageDrawer } from "./ImageDrawer";

/**
 * Loads the image shape in the given engine
 * @param engine the engine where the image shape is going to be added
 */
export async function loadImageShape(engine: Engine): Promise<void> {
    const imageDrawer = new ImageDrawer();

    await engine.addShape("image", imageDrawer);
    await engine.addShape("images", imageDrawer);
}
