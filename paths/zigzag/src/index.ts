import { type MoveEngine, ensureBaseMoverLoaded } from "@tsparticles/plugin-move";
import { type Engine } from "@tsparticles/engine";
import { ZigZagPathGenerator } from "./ZigZagPathGenerator.js";

declare const __VERSION__: string;

export const zigZagPathName = "zigZagPathGenerator";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadZigZagPath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: MoveEngine) => {
    ensureBaseMoverLoaded(e);

    e.pluginManager.addPathGenerator?.(zigZagPathName, container => {
      return Promise.resolve(new ZigZagPathGenerator(container));
    });
  });
}
