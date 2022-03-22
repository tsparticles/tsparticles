import { CircleDrawer } from "./CircleDrawer";
import type { Engine } from "../../engine";

export async function loadCircleShape(engine: Engine): Promise<void> {
    await engine.addShape("circle", new CircleDrawer());
}
