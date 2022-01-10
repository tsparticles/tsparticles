import type { Engine } from "tsparticles-engine";
import { polygonPathGenerator } from "./pathGen";

export const polygonPathName = "polygonPathGenerator";

export async function loadPolygonPath(tsParticles: Engine): Promise<void> {
    await tsParticles.addPathGenerator(polygonPathName, polygonPathGenerator);
}
