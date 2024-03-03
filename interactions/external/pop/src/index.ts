import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPopInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalPop",
        async container => {
            const { Popper } = await import("./Popper.js");

            return new Popper(container);
        },
        refresh,
    );
}
