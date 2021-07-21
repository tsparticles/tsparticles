import type { Main } from "../../main";
import { ImageDrawer } from "./ImageDrawer";

export function loadImageShape(tsParticles: Main): void {
    const imageDrawer = new ImageDrawer();

    tsParticles.addShape("image", imageDrawer);
    tsParticles.addShape("images", imageDrawer);
}
