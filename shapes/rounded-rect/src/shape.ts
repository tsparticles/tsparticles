import type { Engine } from "tsparticles";
import { RoundedRectDrawer } from "./RoundedRectDrawer";

export function loadRoundedRectShape(engine: Engine): void {
    engine.addShape("rounded-rect", new RoundedRectDrawer());
}
