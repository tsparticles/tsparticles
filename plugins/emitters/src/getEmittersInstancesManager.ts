import type { EmittersInstancesManager } from "./EmittersInstancesManager.js";
import type { Engine } from "@tsparticles/engine";

const instancesManagers = new WeakMap<object, Promise<EmittersInstancesManager>>();

/**
 * @param e -
 * @returns -
 */
export async function getEmittersInstancesManager(e: Engine): Promise<EmittersInstancesManager> {
  const pluginManager = e.pluginManager;

  let manager = instancesManagers.get(pluginManager);

  if (!manager) {
    manager = import("./EmittersInstancesManager.js")
      .then(({ EmittersInstancesManager }) => new EmittersInstancesManager(pluginManager))
      .catch((error: unknown) => {
        instancesManagers.delete(pluginManager);
        throw error;
      });

    instancesManagers.set(pluginManager, manager);
  }

  return await manager;
}
