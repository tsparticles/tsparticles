import type { Engine } from "../../engine";
import { SquareDrawer } from "./SquareDrawer";

export async function loadSquareShape(tsParticles: Engine): Promise<void> {
    const drawer = new SquareDrawer();

    await tsParticles.addShape("edge", drawer);
    await tsParticles.addShape("square", drawer);
}
