import type { Engine } from "tsparticles-engine";
import { HeartDrawer } from "./HeartDrawer";

export async function loadHeartShape(engine: Engine): Promise<void> {
    await engine.addShape("heart", new HeartDrawer());
}
