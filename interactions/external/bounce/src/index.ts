import { Bouncer } from "./Bouncer";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalBounceInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalBounce", (container) => new Bouncer(container), refresh);
}

export * from "./Options/Classes/Bounce";
export * from "./Options/Interfaces/IBounce";
