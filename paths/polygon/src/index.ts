import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { type Engine } from "@tsparticles/engine";
import { PolygonPathGenerator } from "./PolygonPathGenerator.js";

declare const __VERSION__: string;

export const polygonPathName = "polygonPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadPolygonPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(polygonPathName, container => {
      return Promise.resolve(new PolygonPathGenerator(container));
    });
  });
}
