import type { Engine } from "tsparticles-engine";
import { Pusher } from "./Pusher";

/**
 * @param engine - The engine to use for the interaction
 * @param refresh -
 */
export async function loadExternalPushInteraction(engine: Engine, refresh = false): Promise<void> {
    await engine.addInteractor("externalPush", (container) => new Pusher(container), refresh);
}

export * from "./Options/Classes/Push";
export * from "./Options/Interfaces/IPush";
