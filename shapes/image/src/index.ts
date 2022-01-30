import type { Engine } from "tsparticles-engine";
import { ImageDrawer } from "./ImageDrawer";

export async function loadImageShape(engine: Engine): Promise<void> {
    const imageDrawer = new ImageDrawer();

    await engine.addShape("image", imageDrawer);
    await engine.addShape("images", imageDrawer);
}
