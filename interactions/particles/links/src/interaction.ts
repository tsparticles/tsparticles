import type { Engine } from "tsparticles-engine";
import type { LinkContainer } from "./Types";
import { Linker } from "./Linker";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksInteraction(engine: Engine, refresh = false): Promise<void> {
    await engine.addInteractor("particlesLinks", (container) => new Linker(container as LinkContainer), refresh);
}
