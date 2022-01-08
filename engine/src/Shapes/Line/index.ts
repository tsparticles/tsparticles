import type { Engine } from "../../engine";
import { LineDrawer } from "./LineDrawer";

export async function loadLineShape(tsParticles: Engine): Promise<void> {
    await tsParticles.addShape("line", new LineDrawer());
}
