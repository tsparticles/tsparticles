import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
export type { DragContainer, DragMode, IDragMode } from "./Types.js";
export { Drag } from "./Options/Classes/Drag.js";
import { Dragger } from "./Dragger.js";
import type { Engine } from "@tsparticles/engine";
export type { IDrag } from "./Options/Interfaces/IDrag.js";

declare const __VERSION__: string;

/**
 * Loads the external drag interaction into the given engine.
 * After loading, particles can be clicked and dragged around the canvas
 * by setting `interactivity.events.onClick.mode` to `"drag"`.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalDragInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalDrag", container => {
      return Promise.resolve(new Dragger(container));
    });
  });
}
