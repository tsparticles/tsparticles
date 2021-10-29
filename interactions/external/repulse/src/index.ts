import type { Main } from "tsparticles-engine";
import { Repulser } from "./Repulser";

export async function loadExternalRepulseInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalRepulse", (container) => new Repulser(container));
}
