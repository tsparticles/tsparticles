import type { Engine } from "../../engine";
import { PolygonDrawer } from "./PolygonDrawer";
import { TriangleDrawer } from "./TriangleDrawer";

export async function loadGenericPolygonShape(tsParticles: Engine): Promise<void> {
    await tsParticles.addShape("polygon", new PolygonDrawer());
}

export async function loadTriangleShape(tsParticles: Engine): Promise<void> {
    await tsParticles.addShape("triangle", new TriangleDrawer());
}

export async function loadPolygonShape(tsParticles: Engine): Promise<void> {
    await loadGenericPolygonShape(tsParticles);
    await loadTriangleShape(tsParticles);
}
