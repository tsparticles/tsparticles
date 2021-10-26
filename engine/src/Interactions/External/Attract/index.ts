import type { Main } from "../../../main";
import { Attractor } from "./Attractor";

export async function loadExternalAttractInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalAttract", (container) => new Attractor(container));
}
