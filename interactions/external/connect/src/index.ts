import type { Engine } from "tsparticles-engine";
import { Connector } from "./Connector";

export async function loadExternalConnectInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalConnect", (container) => new Connector(container));
}
