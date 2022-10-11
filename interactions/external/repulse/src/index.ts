import type { Engine } from "tsparticles-engine";
import { Repulser } from "./Repulser";

export async function loadExternalRepulseInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalRepulse", (container) => new Repulser(engine, container));
}

export * from "./Options/Classes/RepulseBase";
export * from "./Options/Classes/RepulseDiv";
export * from "./Options/Classes/Repulse";
export * from "./Options/Interfaces/IRepulseBase";
export * from "./Options/Interfaces/IRepulseDiv";
export * from "./Options/Interfaces/IRepulse";
