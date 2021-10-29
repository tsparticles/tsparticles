import type { Main } from "tsparticles-engine";
import { Connector } from "./Connector";

export async function loadExternalConnectInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("externalConnect", (container) => new Connector(container));
}
