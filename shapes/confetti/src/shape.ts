import type { Main } from "tsparticles";
import { ConfettiDrawer } from "./ConfettiDrawer";

export function loadConfettiShape(tsParticles: Main): void {
    tsParticles.addShape("confetti", new ConfettiDrawer());
}
