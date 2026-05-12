import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

export type { ICannon } from "./Options/Interfaces/ICannon.js";
export type { CannonContainer, CannonMode, ICannonMode } from "./Types.js";
export { Cannon } from "./Options/Classes/Cannon.js";

declare const __VERSION__: string;

/**
 * Registers the cannon external interaction in the given engine.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalCannonInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity/lazy");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalCannon", async container => {
      const { Cannoner } = await import("./Cannoner.js");

      return new Cannoner(container);
    });
  });
}
