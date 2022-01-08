import type { Engine } from "../../engine";
import { ImageDrawer } from "./ImageDrawer";

export async function loadImageShape(tsParticles: Engine): Promise<void> {
    const imageDrawer = new ImageDrawer();

    await tsParticles.addShape("image", imageDrawer);
    await tsParticles.addShape("images", imageDrawer);
}
