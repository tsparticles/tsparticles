import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalSlowInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalSlow",
        async container => {
            const { Slower } = await import("./Slower.js");

            return new Slower(container);
        },
        refresh,
    );
}

export * from "./Options/Classes/Slow.js";
export * from "./Options/Interfaces/ISlow.js";
