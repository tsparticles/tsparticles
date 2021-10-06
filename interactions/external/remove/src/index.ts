import type { Main } from "tsparticles-engine";
import { Remover } from "./Remover";

export function loadExternalRemoveInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalRemove", (container) => new Remover(container));
}
