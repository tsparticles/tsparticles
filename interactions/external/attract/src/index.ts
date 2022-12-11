import { Attractor } from "./Attractor";
import type { Engine } from "tsparticles-engine";

export async function loadExternalAttractInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalAttract", (container) => new Attractor(engine, container));
}

export * from "./Options/Classes/Attract";
export * from "./Options/Interfaces/IAttract";
