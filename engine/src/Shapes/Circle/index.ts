import { CircleDrawer } from "./CircleDrawer";
import type { Engine } from "../../engine";

export async function loadCircleShape(tsParticles: Engine): Promise<void> {
    await tsParticles.addShape("circle", new CircleDrawer());
}
