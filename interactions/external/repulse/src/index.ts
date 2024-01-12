import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalRepulseInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Repulser } = await import("./Repulser.js");

    await engine.addInteractor("externalRepulse", (container) => new Repulser(engine, container), refresh);
}

export * from "./Options/Classes/RepulseBase.js";
export * from "./Options/Classes/RepulseDiv.js";
export * from "./Options/Classes/Repulse.js";
export * from "./Options/Interfaces/IRepulseBase.js";
export * from "./Options/Interfaces/IRepulseDiv.js";
export * from "./Options/Interfaces/IRepulse.js";
