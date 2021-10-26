import type { Main } from "../../main";
import { validTypes, TextDrawer } from "./TextDrawer";

export async function loadTextShape(tsParticles: Main): Promise<void> {
    const drawer = new TextDrawer();

    for (const type of validTypes) {
        await tsParticles.addShape(type, drawer);
    }
}
