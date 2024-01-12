import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Attractor } = await import("./Attractor.js");

    await engine.addInteractor("externalAttract", (container) => new Attractor(engine, container), refresh);
}

export * from "./Options/Classes/Attract.js";
export * from "./Options/Interfaces/IAttract.js";
