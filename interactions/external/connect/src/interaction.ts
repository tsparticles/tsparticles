import type { Main } from "tsparticles-core";
import { Connector } from "./Connector";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Connector(container));
}
