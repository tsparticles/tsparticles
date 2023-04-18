import type { Engine } from "tsparticles-engine";
import { PolygonPathGenerator } from "./PolygonPathGenerator";

export const polygonPathName = "polygonPathGenerator";

/**
 *
 * @param engine -
 */
export async function loadPolygonPath(engine: Engine): Promise<void> {
    await engine.addPathGenerator(polygonPathName, new PolygonPathGenerator());
}
