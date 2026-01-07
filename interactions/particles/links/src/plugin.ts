import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 */
export function loadLinksPlugin(engine: Engine): void {
    engine.register(async e => {
        const { LinksPlugin } = await import("./LinksPlugin.js");

        e.addPlugin(new LinksPlugin(e));
    });
}
