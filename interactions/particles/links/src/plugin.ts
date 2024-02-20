import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksPlugin(engine: Engine, refresh = true): Promise<void> {
    const { LinksPlugin } = await import("./LinksPlugin.js"),
        plugin = new LinksPlugin();

    await engine.addPlugin(plugin, refresh);
}
