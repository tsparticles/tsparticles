import type { Engine } from "tsparticles-engine";
import { Attractor } from "./Attractor";

export async function loadExternalAttractInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalAttract", (container) => new Attractor(container));
}
