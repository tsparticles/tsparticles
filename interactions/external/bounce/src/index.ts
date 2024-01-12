import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalBounceInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Bouncer } = await import("./Bouncer.js");

    await engine.addInteractor("externalBounce", (container) => new Bouncer(container), refresh);
}

export * from "./Options/Classes/Bounce.js";
export * from "./Options/Interfaces/IBounce.js";
