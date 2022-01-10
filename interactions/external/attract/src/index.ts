import type { Engine } from "tsparticles-engine";
import { Attractor } from "./Attractor";

export async function loadExternalAttractInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("externalAttract", (container) => new Attractor(container));
}
