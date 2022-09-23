import { Connector } from "./Connector";
import type { Engine } from "tsparticles-engine";

export async function loadExternalConnectInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalConnect", (container) => new Connector(container));
}

export * from "./Options/Classes/Connect";
export * from "./Options/Classes/ConnectLinks";
export * from "./Options/Interfaces/IConnect";
export * from "./Options/Interfaces/IConnectLinks";
