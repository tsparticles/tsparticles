import type { Engine } from "../../../engine";
import { Repulser } from "./Repulser";

export async function loadExternalRepulseInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("externalRepulse", (container) => new Repulser(container));
}
