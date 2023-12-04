import type { Engine } from "@tsparticles/engine";
import { PolygonPathGenerator } from "./PolygonPathGenerator.js";

export const polygonPathName = "polygonPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPolygonPath(engine: Engine, refresh = true): Promise<void> {
    await engine.addPathGenerator(polygonPathName, new PolygonPathGenerator(), refresh);
}
