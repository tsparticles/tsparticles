import type { Main } from "../../main";
import { PolygonDrawer } from "./PolygonDrawer";
import { TriangleDrawer } from "./TriangleDrawer";

export async function loadGenericPolygonShape(tsParticles: Main): Promise<void> {
    await tsParticles.addShape("polygon", new PolygonDrawer());
}

export async function loadTriangleShape(tsParticles: Main): Promise<void> {
    await tsParticles.addShape("triangle", new TriangleDrawer());
}

export async function loadPolygonShape(tsParticles: Main): Promise<void> {
    await loadGenericPolygonShape(tsParticles);
    await loadTriangleShape(tsParticles);
}
