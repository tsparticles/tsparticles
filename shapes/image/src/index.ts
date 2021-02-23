import type { Main } from "tsparticles-core";
import { ImageDrawer } from "./ImageDrawer";

export function loadImageShape(tsParticles: Main): void {
    const imageDrawer = new ImageDrawer();

    tsParticles.addShape("image", imageDrawer);
    tsParticles.addShape("images", imageDrawer);
}
