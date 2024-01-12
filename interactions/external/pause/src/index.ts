import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalPauseInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Pauser } = await import("./Pauser.js");

    await engine.addInteractor("externalPause", (container) => new Pauser(container), refresh);
}
