import type { Main } from "tsparticles-core";
import { PolygonDrawer } from "./PolygonDrawer";
import { TriangleDrawer } from "./TriangleDrawer";

export function loadPolygonShape(tsParticles: Main): void {
    tsParticles.addShape("polygon", new PolygonDrawer());
}

export function loadTriangleShape(tsParticles: Main): void {
    tsParticles.addShape("triangle", new TriangleDrawer());
}

export function loadShape(tsParticles: Main): void {
    loadPolygonShape(tsParticles);
    loadTriangleShape(tsParticles);
}
