import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadParticlesLinksInteraction(engine: Engine, refresh = true): Promise<void> {
    const { loadLinksInteraction } = await import("./interaction.js"),
        { loadLinksPlugin } = await import("./plugin.js");

    await loadLinksInteraction(engine, refresh);
    await loadLinksPlugin(engine, refresh);
}

export * from "./Options/Classes/Links.js";
export * from "./Options/Classes/LinksShadow.js";
export * from "./Options/Classes/LinksTriangle.js";
export * from "./Options/Interfaces/ILinks.js";
export * from "./Options/Interfaces/ILinksShadow.js";
export * from "./Options/Interfaces/ILinksTriangle.js";
