import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalBounceInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalBounce",
        async (container) => {
            const { Bouncer } = await import("./Bouncer.js");

            return new Bouncer(container);
        },
        refresh,
    );
}

export * from "./Options/Classes/Bounce.js";
export * from "./Options/Interfaces/IBounce.js";
