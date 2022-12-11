import type { Engine } from "tsparticles-engine";
import { SquareDrawer } from "./SquareDrawer";

export async function loadSquareShape(engine: Engine): Promise<void> {
    const drawer = new SquareDrawer();

    await engine.addShape(["edge", "square"], drawer);
}
