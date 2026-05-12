import { type Engine } from "@tsparticles/engine/lazy";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

declare const __VERSION__: string;

/**
 * Registers the connect external interaction in the given engine.
 * @param engine - The engine to register the interaction into
 */
export async function loadExternalConnectInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const { ensureInteractivityPluginLoaded } = await import("@tsparticles/plugin-interactivity/lazy");

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addInteractor?.("externalConnect", async container => {
      const { Connector } = await import("./Connector.js");

      return new Connector(container);
    });
  });
}

export * from "./Options/Classes/Connect.js";
export * from "./Options/Classes/ConnectLinks.js";
export type * from "./Options/Interfaces/IConnect.js";
export type * from "./Options/Interfaces/IConnectLinks.js";
