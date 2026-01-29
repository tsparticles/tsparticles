import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

export const polygonPathName = "polygonPathGenerator";

/**
 * @param engine -
 */
export async function loadPolygonPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addPathGenerator(polygonPathName, async container => {
      const { PolygonPathGenerator } = await import("./PolygonPathGenerator.js");

      return new PolygonPathGenerator(container);
    });
  });
}
