import { type Engine } from "@tsparticles/engine";
import { loadLinksInteraction } from "./interaction.js";
import { loadLinksPlugin } from "./plugin.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesLinksInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await loadLinksInteraction(engine, refresh);
    await loadLinksPlugin(engine, refresh);
}

export * from "./Options/Classes/Links.js";
export * from "./Options/Classes/LinksShadow.js";
export * from "./Options/Classes/LinksTriangle.js";
export * from "./Options/Interfaces/ILinks.js";
export * from "./Options/Interfaces/ILinksShadow.js";
export * from "./Options/Interfaces/ILinksTriangle.js";
