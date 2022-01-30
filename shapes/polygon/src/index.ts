import type { Engine } from "tsparticles-engine";
import { PolygonDrawer } from "./PolygonDrawer";
import { TriangleDrawer } from "./TriangleDrawer";

export async function loadGenericPolygonShape(engine: Engine): Promise<void> {
    await engine.addShape("polygon", new PolygonDrawer());
}

export async function loadTriangleShape(engine: Engine): Promise<void> {
    await engine.addShape("triangle", new TriangleDrawer());
}

export async function loadPolygonShape(engine: Engine): Promise<void> {
    await loadGenericPolygonShape(engine);
    await loadTriangleShape(engine);
}
