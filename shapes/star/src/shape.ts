import type { Main } from "tsparticles-core";
import { StarDrawer } from "./StarDrawer";

export function loadShape(tsParticles: Main): void {
    tsParticles.addShape("star", new StarDrawer());
}
