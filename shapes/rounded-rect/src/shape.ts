import type { Main } from "tsparticles";
import { RoundedRectDrawer } from "./RoundedRectDrawer";

export function loadRoundedRectShape(tsParticles: Main): void {
    tsParticles.addShape("rounded-rect", new RoundedRectDrawer());
}
