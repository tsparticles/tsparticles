import type { Engine } from "tsparticles-engine";
import { polygonPathGenerator } from "./pathGen";

export const polygonPathName = "polygonPathGenerator";

export async function loadPolygonPath(engine: Engine): Promise<void> {
    await engine.addPathGenerator(polygonPathName, polygonPathGenerator);
}
