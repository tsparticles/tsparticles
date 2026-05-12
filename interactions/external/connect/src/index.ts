import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { Connector } from "./Connector.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * Registers the connect external interaction in the given engine.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalConnectInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalConnect", container => {
      return Promise.resolve(new Connector(container));
    });
  });
}

export * from "./Options/Classes/Connect.js";
export * from "./Options/Classes/ConnectLinks.js";
export type * from "./Options/Interfaces/IConnect.js";
export type * from "./Options/Interfaces/IConnectLinks.js";
