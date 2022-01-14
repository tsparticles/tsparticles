import { Engine } from "tsparticles";
import { HeartDrawer } from "./HeartDrawer";

export function loadHeartShape(engine: Engine): void {
    engine.addShape("heart", new HeartDrawer());
}
