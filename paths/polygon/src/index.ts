import type { Engine } from "@tsparticles/engine";

export const polygonPathName = "polygonPathGenerator";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadPolygonPath(engine: Engine, refresh = true): Promise<void> {
    const { PolygonPathGenerator } = await import("./PolygonPathGenerator.js");

    await engine.addPathGenerator(polygonPathName, new PolygonPathGenerator(), refresh);
}
