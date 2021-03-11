import type { Main } from "tsparticles-engine";
import { StarDrawer } from "./StarDrawer";

export function loadStarShape(tsParticles: Main): void {
    tsParticles.addShape("star", new StarDrawer());
}
