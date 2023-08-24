import type { Engine } from "@tsparticles/engine";
import { loadLinksInteraction } from "./interaction";
import { loadLinksPlugin } from "./plugin";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesLinksInteraction(engine: Engine, refresh = true): Promise<void> {
    await loadLinksInteraction(engine, refresh);
    await loadLinksPlugin(engine, refresh);
}

export * from "./Options/Classes/Links";
export * from "./Options/Classes/LinksShadow";
export * from "./Options/Classes/LinksTriangle";
export * from "./Options/Interfaces/ILinks";
export * from "./Options/Interfaces/ILinksShadow";
export * from "./Options/Interfaces/ILinksTriangle";
