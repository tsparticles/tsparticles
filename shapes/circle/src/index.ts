import type { Main } from "tsparticles-engine";
import { CircleDrawer } from "./CircleDrawer";

export async function loadCircleShape(tsParticles: Main): Promise<void> {
    await tsParticles.addShape("circle", new CircleDrawer());
}
