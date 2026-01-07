import type { Engine } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";

/**
 * @param engine -
 */
export function loadLinksInteraction(engine: Engine): void {
    engine.register(e => {
        e.addInteractor("particlesLinks", async container => {
            const { Linker } = await import("./Linker.js");

            return new Linker(container as LinkContainer, engine);
        });
    });
}
