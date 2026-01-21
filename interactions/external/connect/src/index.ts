import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalConnectInteraction(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        await loadInteractivityPlugin(e);

        e.addInteractor?.("externalConnect", async container => {
            const { Connector } = await import("./Connector.js");

            return new Connector(container);
        });
    });
}

export * from "./Options/Classes/Connect.js";
export * from "./Options/Classes/ConnectLinks.js";
export type * from "./Options/Interfaces/IConnect.js";
export type * from "./Options/Interfaces/IConnectLinks.js";
