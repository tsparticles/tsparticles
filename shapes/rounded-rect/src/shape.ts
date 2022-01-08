import type { Engine } from "tsparticles";
import { RoundedRectDrawer } from "./RoundedRectDrawer";

export function loadRoundedRectShape(tsParticles: Engine): void {
    tsParticles.addShape("rounded-rect", new RoundedRectDrawer());
}
