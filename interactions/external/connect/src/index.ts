import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { Connector } from "./Connector.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalConnectInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

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
