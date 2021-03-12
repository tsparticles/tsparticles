import type { Main } from "tsparticles-engine";
import { CircleDrawer } from "./CircleDrawer";

export function loadCircleShape(tsParticles: Main): void {
    tsParticles.addShape("circle", new CircleDrawer());
}
