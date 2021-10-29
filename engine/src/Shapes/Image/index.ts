import type { Main } from "../../main";
import { ImageDrawer } from "./ImageDrawer";

export async function loadImageShape(tsParticles: Main): Promise<void> {
    const imageDrawer = new ImageDrawer();

    await tsParticles.addShape("image", imageDrawer);
    await tsParticles.addShape("images", imageDrawer);
}
