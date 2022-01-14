import type { Engine } from "tsparticles-engine";
import { StarDrawer } from "./StarDrawer";

export async function loadStarShape(engine: Engine): Promise<void> {
    await engine.addShape("star", new StarDrawer());
}
