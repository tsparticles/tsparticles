import type { Engine } from "tsparticles";
import { SpiralDrawer } from "./SpiralDrawer";

export function loadSpiralShape(tsParticles: Engine): void {
    tsParticles.addShape("spiral", new SpiralDrawer());
}
