import type { Main } from "tsparticles-core";
import { SquareDrawer } from "./SquareDrawer";

export function loadShape(tsParticles: Main): void {
    const drawer = new SquareDrawer();

    tsParticles.addShape("edge", drawer);
    tsParticles.addShape("square", drawer);
}
