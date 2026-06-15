import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import type { Engine } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import { Linker } from "./Linker.js";
import { LinksPlugin } from "./LinksPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadParticlesLinksInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    const pluginManager = e.pluginManager;

    ensureInteractivityPluginLoaded(e);

    pluginManager.addPlugin(new LinksPlugin(pluginManager));

    pluginManager.addInteractor?.("particlesLinks", container => {
      return Promise.resolve(new Linker(pluginManager, container as LinkContainer));
    });
  });
}

export * from "./Options/Classes/Links.js";
export * from "./Options/Classes/LinksShadow.js";
export * from "./Options/Classes/LinksTriangle.js";
export type * from "./Options/Interfaces/ILinks.js";
export type * from "./Options/Interfaces/ILinksShadow.js";
export type * from "./Options/Interfaces/ILinksTriangle.js";
