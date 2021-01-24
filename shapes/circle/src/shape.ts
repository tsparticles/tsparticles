import type { Main } from "tsparticles-core";
import { CircleDrawer } from "./CircleDrawer";

export function loadShape(tsParticles: Main): void {
    tsParticles.addShape("circle", new CircleDrawer());
}
