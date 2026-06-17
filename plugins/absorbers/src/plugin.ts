import { AbsorbersPlugin } from "./AbsorbersPlugin.js";
import { type Engine } from "@tsparticles/engine";
import { getAbsorbersInstancesManager } from "./getAbsorbersInstancesManager.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadAbsorbersPluginSimple(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: Engine) => {
    const pluginManager = e.pluginManager,
      instancesManager = await getAbsorbersInstancesManager(e);

    pluginManager.addPlugin(new AbsorbersPlugin(instancesManager));
  });
}

export type * from "./AbsorberContainer.js";
