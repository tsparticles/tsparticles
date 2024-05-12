import type { Engine } from "@tsparticles/engine";
import { LinksPlugin } from "./LinksPlugin.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksPlugin(engine: Engine, refresh = true): Promise<void> {
    const plugin = new LinksPlugin();

    await engine.addPlugin(plugin, refresh);
}
