import type { Main } from "../../main";
import { SquareDrawer } from "./SquareDrawer";

export function loadSquareShape(tsParticles: Main): void {
    const drawer = new SquareDrawer();

    tsParticles.addShape("edge", drawer);
    tsParticles.addShape("square", drawer);
}
