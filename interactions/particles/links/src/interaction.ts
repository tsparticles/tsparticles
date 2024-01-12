import type { Engine } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Linker } = await import("./Linker.js");

    await engine.addInteractor("particlesLinks", (container) => new Linker(container as LinkContainer), refresh);
}
