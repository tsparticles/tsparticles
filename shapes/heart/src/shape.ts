import { Engine } from "tsparticles";
import { HeartDrawer } from "./HeartDrawer";

export function loadHeartShape(tsParticles: Engine): void {
    tsParticles.addShape("heart", new HeartDrawer());
}
