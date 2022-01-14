import type { Engine } from "tsparticles-engine";
import { validTypes, TextDrawer } from "./TextDrawer";

export async function loadTextShape(engine: Engine): Promise<void> {
    const drawer = new TextDrawer();

    for (const type of validTypes) {
        await engine.addShape(type, drawer);
    }
}
