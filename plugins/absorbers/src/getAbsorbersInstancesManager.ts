import type { AbsorbersInstancesManager } from "./AbsorbersInstancesManager.js";
import type { Engine } from "@tsparticles/engine";

const instancesManagers = new WeakMap<object, AbsorbersInstancesManager>();

/**
 *
 * @param e
 */
export async function getAbsorbersInstancesManager(e: Engine): Promise<AbsorbersInstancesManager> {
  const pluginManager = e.pluginManager;

  let manager = instancesManagers.get(pluginManager);

  if (!manager) {
    const { AbsorbersInstancesManager } = await import("./AbsorbersInstancesManager.js");

    manager = new AbsorbersInstancesManager(pluginManager);

    instancesManagers.set(pluginManager, manager);
  }

  return manager;
}
