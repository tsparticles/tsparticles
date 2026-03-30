import type { Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";
import type { LinkContainer } from "./Types.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadParticlesLinksInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const pluginManager = e.pluginManager,
      [
        { ensureInteractivityPluginLoaded },
        { LinksPlugin },
      ] = await Promise.all([
        import("@tsparticles/plugin-interactivity"),
        import("./LinksPlugin.js"),
      ]);

    ensureInteractivityPluginLoaded(e);

    pluginManager.addPlugin(new LinksPlugin(pluginManager));

    pluginManager.addInteractor?.("particlesLinks", async container => {
      const { Linker } = await import("./Linker.js");

      return new Linker(pluginManager, container as LinkContainer);
    });
  });
}

export * from "./Options/Classes/Links.js";
export * from "./Options/Classes/LinksShadow.js";
export * from "./Options/Classes/LinksTriangle.js";
export type * from "./Options/Interfaces/ILinks.js";
export type * from "./Options/Interfaces/ILinksShadow.js";
export type * from "./Options/Interfaces/ILinksTriangle.js";
