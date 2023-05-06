import type { Engine } from "@tsparticles/engine";
import { Pusher } from "./Pusher";

/**
 *
 * @param engine
 */
export async function loadExternalPushInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalPush", (container) => new Pusher(container));
}

export * from "./Options/Classes/Push";
export * from "./Options/Interfaces/IPush";
