import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPopInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Popper } = await import("./Popper.js");

    await engine.addInteractor("externalPop", (container) => new Popper(container), refresh);
}
