import type { Engine } from "tsparticles-engine";
import { SquareDrawer } from "./SquareDrawer";

/**
 * @param engine -
 */
export async function loadSquareShape(engine: Engine): Promise<void> {
    await engine.addShape(["edge", "square"], new SquareDrawer());
}
