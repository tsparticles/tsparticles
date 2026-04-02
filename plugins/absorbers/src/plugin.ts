import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadAbsorbersPluginSimple(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: Engine) => {
    const [
        { getAbsorbersInstancesManager },
        { AbsorbersPlugin },
      ] = await Promise.all([
        import("./getAbsorbersInstancesManager.js"),
        import("./AbsorbersPlugin.js"),
      ]),
      pluginManager = e.pluginManager,
      instancesManager = await getAbsorbersInstancesManager(e);

    pluginManager.addPlugin(new AbsorbersPlugin(instancesManager));
  });
}

export type * from "./AbsorberContainer.js";
