import type { EmittersInstancesManager } from "./EmittersInstancesManager.js";
import type { Engine } from "@tsparticles/engine";

const instancesManagers = new WeakMap<object, EmittersInstancesManager>();

/**
 *
 * @param e
 */
export async function getEmittersInstancesManager(e: Engine): Promise<EmittersInstancesManager> {
  const pluginManager = e.pluginManager;

  let manager = instancesManagers.get(pluginManager);

  if (!manager) {
    const { EmittersInstancesManager } = await import("./EmittersInstancesManager.js");

    manager = new EmittersInstancesManager(pluginManager);

    instancesManagers.set(pluginManager, manager);
  }

  return manager;
}
