import type { Main } from "../../main";
import { CircleDrawer } from "./CircleDrawer";

export async function loadCircleShape(tsParticles: Main): Promise<void> {
    await tsParticles.addShape("circle", new CircleDrawer());
}
