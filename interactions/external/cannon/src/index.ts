import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
export { Cannon } from "./Options/Classes/Cannon.js";
import { Cannoner } from "./Cannoner.js";
import { type Engine } from "@tsparticles/engine";
export type { ICannon } from "./Options/Interfaces/ICannon.js";
export type { CannonContainer, CannonMode, ICannonMode } from "./Types.js";

declare const __VERSION__: string;

/**
 * Registers the cannon external interaction in the given engine.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalCannonInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalCannon", container => {
      return Promise.resolve(new Cannoner(container));
    });
  });
}
