import type { Engine } from "tsparticles-engine";
import { SpiralDrawer } from "./SpiralDrawer";

export function loadSpiralShape(engine: Engine): void {
    engine.addShape("spiral", new SpiralDrawer());
}
