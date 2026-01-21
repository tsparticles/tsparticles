import type { Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";
import type { LinkContainer } from "./Types.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadParticlesLinksInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity"),
            { LinksPlugin } = await import("./LinksPlugin.js");

        loadInteractivityPlugin(e);

        e.addPlugin(new LinksPlugin(e));

        e.addInteractor?.("particlesLinks", async container => {
            const { Linker } = await import("./Linker.js");

            return new Linker(container as LinkContainer, engine);
        });
    });
}

export * from "./Options/Classes/Links.js";
export * from "./Options/Classes/LinksShadow.js";
export * from "./Options/Classes/LinksTriangle.js";
export type * from "./Options/Interfaces/ILinks.js";
export type * from "./Options/Interfaces/ILinksShadow.js";
export type * from "./Options/Interfaces/ILinksTriangle.js";
