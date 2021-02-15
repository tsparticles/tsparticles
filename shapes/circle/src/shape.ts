import type { Main } from "tsparticles-core";
import { CircleDrawer } from "./CircleDrawer";

export function loadCircleShape(tsParticles: Main): void {
    tsParticles.addShape("circle", new CircleDrawer());
}
