import type { Main } from "../../main";
import { LineDrawer } from "./LineDrawer";

export async function loadLineShape(tsParticles: Main): Promise<void> {
    await tsParticles.addShape("line", new LineDrawer());
}
