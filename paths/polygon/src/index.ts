import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const polygonPathName = "polygonPathGenerator";

/**
 * @param engine -
 */
export function loadPolygonPath(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { PolygonPathGenerator } = await import("./PolygonPathGenerator.js");

        e.addPathGenerator(polygonPathName, new PolygonPathGenerator());
    });
}
