import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadParticlesLinksInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { loadLinksInteraction } = await import("./interaction.js"),
            { loadLinksPlugin } = await import("./plugin.js");

        loadLinksInteraction(e);
        loadLinksPlugin(e);
    });
}

export * from "./Options/Classes/Links.js";
export * from "./Options/Classes/LinksShadow.js";
export * from "./Options/Classes/LinksTriangle.js";
export type * from "./Options/Interfaces/ILinks.js";
export type * from "./Options/Interfaces/ILinksShadow.js";
export type * from "./Options/Interfaces/ILinksTriangle.js";
