import type { Engine } from "tsparticles";
import { polygonPathGenerator } from "./pathGen";

export const polygonPathName = "polygonPathGenerator";

export function loadPolygonPath(tsParticles: Engine): void {
    tsParticles.addPathGenerator(polygonPathName, polygonPathGenerator);
}
