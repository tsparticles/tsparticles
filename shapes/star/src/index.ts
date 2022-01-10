import type { Engine } from "tsparticles-engine";
import { StarDrawer } from "./StarDrawer";

export async function loadStarShape(tsParticles: Engine): Promise<void> {
    await tsParticles.addShape("star", new StarDrawer());
}
