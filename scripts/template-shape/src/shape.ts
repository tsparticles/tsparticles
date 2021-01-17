import type { Main } from "tsparticles-core";
import { ShapeDrawer } from "./ShapeDrawer";

export function loadShape(tsParticles: Main): void {
    tsParticles.addShape("shape", new ShapeDrawer());
}
