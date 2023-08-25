import type { Engine } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import { Linker } from "./Linker.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("particlesLinks", (container) => new Linker(container as LinkContainer), refresh);
}
