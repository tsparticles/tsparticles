import type { Main } from "tsparticles-engine";
import { LineDrawer } from "./LineDrawer";

export async function loadLineShape(tsParticles: Main): Promise<void> {
    await tsParticles.addShape("line", new LineDrawer());
}
