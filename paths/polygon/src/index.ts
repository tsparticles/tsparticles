import type { Engine } from "tsparticles";
import { PolygonPathGenerator } from "./PolygonPathGenerator";

export const polygonPathName = "polygonPathGenerator";

export function loadPolygonPath(engine: Engine): void {
    engine.addPathGenerator(polygonPathName, new PolygonPathGenerator());
}
