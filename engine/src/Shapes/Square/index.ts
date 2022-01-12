import type { Engine } from "../../engine";
import { SquareDrawer } from "./SquareDrawer";

export async function loadSquareShape(engine: Engine): Promise<void> {
    const drawer = new SquareDrawer();

    await engine.addShape("edge", drawer);
    await engine.addShape("square", drawer);
}
