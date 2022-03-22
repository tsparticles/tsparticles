import { TextDrawer, validTypes } from "./TextDrawer";
import type { Engine } from "../../engine";

export async function loadTextShape(engine: Engine): Promise<void> {
    const drawer = new TextDrawer();

    for (const type of validTypes) {
        await engine.addShape(type, drawer);
    }
}
