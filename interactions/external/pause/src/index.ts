import type { Main } from "tsparticles-engine";
import { Pauser } from "./Pauser";

export function loadExternalPauseInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalPause", (container) => new Pauser(container));
}
