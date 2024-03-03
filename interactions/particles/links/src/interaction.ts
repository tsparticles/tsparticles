import type { Engine } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "particlesLinks",
        async container => {
            const { Linker } = await import("./Linker.js");

            return new Linker(container as LinkContainer);
        },
        refresh,
    );
}
