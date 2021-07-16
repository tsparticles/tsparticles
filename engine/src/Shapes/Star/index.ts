import type { Main } from "../../main";
import { StarDrawer } from "./StarDrawer";

export function loadStarShape(tsParticles: Main): void {
    tsParticles.addShape("star", new StarDrawer());
}
