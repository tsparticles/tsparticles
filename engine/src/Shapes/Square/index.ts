import type { Main } from "../../main";
import { SquareDrawer } from "./SquareDrawer";

export async function loadSquareShape(tsParticles: Main): Promise<void> {
    const drawer = new SquareDrawer();

    await tsParticles.addShape("edge", drawer);
    await tsParticles.addShape("square", drawer);
}
