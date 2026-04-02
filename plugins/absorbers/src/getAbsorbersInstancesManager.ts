import type { AbsorbersInstancesManager } from "./AbsorbersInstancesManager.js";
import type { Engine } from "@tsparticles/engine";

const instancesManagers = new WeakMap<object, Promise<AbsorbersInstancesManager>>();

/**
 * @param e -
 * @returns -
 */
export async function getAbsorbersInstancesManager(e: Engine): Promise<AbsorbersInstancesManager> {
  const pluginManager = e.pluginManager;

  let manager = instancesManagers.get(pluginManager);

  if (!manager) {
    manager = import("./AbsorbersInstancesManager.js")
      .then(({ AbsorbersInstancesManager }) => new AbsorbersInstancesManager(pluginManager))
      .catch((error: unknown) => {
        instancesManagers.delete(pluginManager);
        throw error;
      });

    instancesManagers.set(pluginManager, manager);
  }

  return await manager;
}
