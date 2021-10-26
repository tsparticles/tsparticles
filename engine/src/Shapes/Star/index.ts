import type { Main } from "../../main";
import { StarDrawer } from "./StarDrawer";

export async function loadStarShape(tsParticles: Main): Promise<void> {
    await tsParticles.addShape("star", new StarDrawer());
}
