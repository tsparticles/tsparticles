import { Connector } from "./Connector";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalConnectInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor("externalConnect", (container) => new Connector(container), refresh);
}

export * from "./Options/Classes/Connect";
export * from "./Options/Classes/ConnectLinks";
export * from "./Options/Interfaces/IConnect";
export * from "./Options/Interfaces/IConnectLinks";
