import { Connector } from "./Connector";
import type { Engine } from "../../../engine";

export async function loadExternalConnectInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalConnect", (container) => new Connector(container));
}
