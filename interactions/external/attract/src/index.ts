import { Attractor } from "./Attractor";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalAttractInteraction(engine: Engine, refresh = false): Promise<void> {
    await engine.addInteractor("externalAttract", (container) => new Attractor(engine, container), refresh);
}

export * from "./Options/Classes/Attract";
export * from "./Options/Interfaces/IAttract";
