import type { Main } from "tsparticles-engine";
import { SpiralDrawer } from "./SpiralDrawer";

export function loadSpiralShape(tsParticles: Main) {
    tsParticles.addShape("spiral", new SpiralDrawer());
}
