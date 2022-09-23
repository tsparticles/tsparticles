import type { Engine } from "tsparticles-engine";
import { Slower } from "./Slower";

export async function loadExternalSlowInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalSlow", (container) => new Slower(container));
}

export * from "./Options/Classes/Slow";
export * from "./Options/Interfaces/ISlow";
