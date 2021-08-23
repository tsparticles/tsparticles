import type { Main } from "tsparticles";
import { polygonPathGenerator } from "./pathGen";

export const polygonPathName = "polygonPathGenerator";

export function loadPolygonPath(tsParticles: Main): void {
    tsParticles.addPathGenerator(polygonPathName, polygonPathGenerator);
}
