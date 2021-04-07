import type { Main } from "tsparticles";
import { SpiralDrawer } from "./SpiralDrawer";

export function loadSpiralShape(tsParticles: Main): void {
    tsParticles.addShape("spiral", new SpiralDrawer());
}
