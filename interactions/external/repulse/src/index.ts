import type { Engine } from "@tsparticles/engine";
import { Repulser } from "./Repulser";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRepulseInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalRepulse", (container) => new Repulser(engine, container), refresh);
}

export * from "./Options/Classes/RepulseBase";
export * from "./Options/Classes/RepulseDiv";
export * from "./Options/Classes/Repulse";
export * from "./Options/Interfaces/IRepulseBase";
export * from "./Options/Interfaces/IRepulseDiv";
export * from "./Options/Interfaces/IRepulse";
