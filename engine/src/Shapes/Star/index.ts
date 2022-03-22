import type { Engine } from "../../engine";
import { StarDrawer } from "./StarDrawer";

export async function loadStarShape(engine: Engine): Promise<void> {
    await engine.addShape("star", new StarDrawer());
}
