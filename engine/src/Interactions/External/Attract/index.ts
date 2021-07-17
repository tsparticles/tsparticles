import type { Main } from "../../../main";
import { Attractor } from "./Attractor";

export function loadExternalAttractInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalAttract", (container) => new Attractor(container));
}
