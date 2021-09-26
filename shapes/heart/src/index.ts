import { Main } from "tsparticles-engine";
import { HeartDrawer } from "./HeartDrawer";

export function loadHeartShape(tsParticles: Main): void {
    tsParticles.addShape("heart", new HeartDrawer());
}
