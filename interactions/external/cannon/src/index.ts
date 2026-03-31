import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";
export type { ICannon } from "./Options/Interfaces/ICannon.js";
export type { CannonContainer, CannonMode, ICannonMode } from "./Types.js";
export { Cannon } from "./Options/Classes/Cannon.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalCannonInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalCannon", async container => {
      const { Cannoner } = await import("./Cannoner.js");

      return new Cannoner(container);
    });
  });
}
