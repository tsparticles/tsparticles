import type { Main } from "../../main";
import { CircleDrawer } from "./CircleDrawer";

export function loadCircleShape(tsParticles: Main): void {
    tsParticles.addShape("circle", new CircleDrawer());
}
