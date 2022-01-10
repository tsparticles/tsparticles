import type { Engine } from "tsparticles-engine";
import { CircleDrawer } from "./CircleDrawer";

export async function loadCircleShape(tsParticles: Engine): Promise<void> {
    await tsParticles.addShape("circle", new CircleDrawer());
}
