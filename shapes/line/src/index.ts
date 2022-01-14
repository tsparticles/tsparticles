import type { Engine } from "tsparticles-engine";
import { LineDrawer } from "./LineDrawer";

export async function loadLineShape(engine: Engine): Promise<void> {
    await engine.addShape("line", new LineDrawer());
}
