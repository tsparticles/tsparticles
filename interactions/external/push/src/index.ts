import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine to use for the interaction
 * @param refresh -
 */
export async function loadExternalPushInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Pusher } = await import("./Pusher.js");

    await engine.addInteractor("externalPush", (container) => new Pusher(container), refresh);
}

export * from "./Options/Classes/Push.js";
export * from "./Options/Interfaces/IPush.js";
