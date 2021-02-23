import type { Main } from "tsparticles-core";
import { Connector } from "./Connector";

export function loadExternalConnectInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalConnect", (container) => new Connector(container));
}
