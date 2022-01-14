import type { Engine } from "tsparticles-engine";
import { CircleDrawer } from "./CircleDrawer";

export async function loadCircleShape(engine: Engine): Promise<void> {
    await engine.addShape("circle", new CircleDrawer());
}
