import type { Engine } from "tsparticles-engine";
import { PathDrawer } from "./PathDrawer";

export async function loadPathShape(engine: Engine): Promise<void> {
    await engine.addShape("path", new PathDrawer());
}
