import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import { options } from "./options.js";

const presetName = "links";

/**
 * @param engine - The engine to load the shape in
 */
export async function loadLinksPreset(engine: Engine): Promise<void> {
  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      (async (): Promise<void> => {
        await loadInteractivityPlugin(e);
        await loadParticlesLinksInteraction(e);
      })(),
    ]);

    e.pluginManager.addPreset(presetName, options);
  });
}
