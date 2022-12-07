import { TextDrawer, validTypes } from "./TextDrawer";
import type { Engine } from "tsparticles-engine";

export async function loadTextShape(engine: Engine): Promise<void> {
    await engine.addShape(validTypes, new TextDrawer());
}
