import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadExternalConnectInteraction(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        e.addInteractor("externalConnect", async container => {
            const { Connector } = await import("./Connector.js");

            return new Connector(container);
        });
    });
}

export * from "./Options/Classes/Connect.js";
export * from "./Options/Classes/ConnectLinks.js";
export type * from "./Options/Interfaces/IConnect.js";
export type * from "./Options/Interfaces/IConnectLinks.js";
