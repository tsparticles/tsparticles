import type { Engine } from "../../engine";
import { LineDrawer } from "./LineDrawer";

export async function loadLineShape(engine: Engine): Promise<void> {
    await engine.addShape("line", new LineDrawer());
}
