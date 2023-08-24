import type { Engine } from "@tsparticles/engine";
import { Slower } from "./Slower";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalSlowInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalSlow", (container) => new Slower(container), refresh);
}

export * from "./Options/Classes/Slow";
export * from "./Options/Interfaces/ISlow";
