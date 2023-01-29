import type { Engine } from "@tsparticles/engine";
import { RibbonDrawer } from "./RibbonDrawer";

export async function loadRibbonShape(engine: Engine): Promise<void> {
    await engine.addShape("ribbon", new RibbonDrawer());
}
