import type { Engine } from "@tsparticles/engine";

/**
 * @param engine - The engine to load the interaction for.
 * @param refresh -
 */
export async function loadExternalGrabInteraction(engine: Engine, refresh = true): Promise<void> {
    const { Grabber } = await import("./Grabber.js");

    await engine.addInteractor("externalGrab", (container) => new Grabber(container), refresh);
}

export * from "./Options/Classes/Grab.js";
export * from "./Options/Classes/GrabLinks.js";
export * from "./Options/Interfaces/IGrab.js";
export * from "./Options/Interfaces/IGrabLinks.js";
