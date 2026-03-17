import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * Loads the external drag interaction into the given engine.
 * After loading, particles can be clicked and dragged around the canvas
 * by setting `interactivity.events.onClick.mode` to `"drag"`.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalDragInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity");

    ensureInteractivityPluginLoaded(e);

    e.addInteractor?.("externalDrag", async container => {
      const { Dragger } = await import("./Dragger.js");

      return new Dragger(container);
    });
  });
}
