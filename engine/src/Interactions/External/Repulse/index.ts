import type { Main } from "../../../main";
import { Repulser } from "./Repulser";

export async function loadExternalRepulseInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalRepulse", (container) => new Repulser(container));
}
