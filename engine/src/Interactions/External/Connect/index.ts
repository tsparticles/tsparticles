import type { Main } from "../../../main";
import { Connector } from "./Connector";

export function loadExternalConnectInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalConnect", (container) => new Connector(container));
}
