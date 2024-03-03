import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPauseInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalPause",
        async container => {
            const { Pauser } = await import("./Pauser.js");

            return new Pauser(container);
        },
        refresh,
    );
}
