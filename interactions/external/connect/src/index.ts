import { Connector } from "./Connector.js";
import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalConnectInteraction(engine: Engine, refresh = true): Promise<void> {
    await engine.addInteractor(
        "externalConnect",
        container => {
            return Promise.resolve(new Connector(container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Connect.js";
export * from "./Options/Classes/ConnectLinks.js";
export * from "./Options/Interfaces/IConnect.js";
export * from "./Options/Interfaces/IConnectLinks.js";
