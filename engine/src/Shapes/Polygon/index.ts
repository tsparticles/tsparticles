import type { Main } from "../../main";
import { PolygonDrawer } from "./PolygonDrawer";
import { TriangleDrawer } from "./TriangleDrawer";

export function loadGenericPolygonShape(tsParticles: Main): void {
    tsParticles.addShape("polygon", new PolygonDrawer());
}

export function loadTriangleShape(tsParticles: Main): void {
    tsParticles.addShape("triangle", new TriangleDrawer());
}

export function loadPolygonShape(tsParticles: Main): void {
    loadGenericPolygonShape(tsParticles);
    loadTriangleShape(tsParticles);
}
