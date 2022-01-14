import type { Engine } from "tsparticles";
import { polygonPathGenerator } from "./pathGen";

export const polygonPathName = "polygonPathGenerator";

export function loadPolygonPath(engine: Engine): void {
    engine.addPathGenerator(polygonPathName, polygonPathGenerator);
}
