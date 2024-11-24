import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { PolygonPathGenerator } from "./PolygonPathGenerator.js";

declare const __VERSION__: string;

export const polygonPathName = "polygonPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPolygonPath(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addPathGenerator(polygonPathName, new PolygonPathGenerator(), refresh);
}
