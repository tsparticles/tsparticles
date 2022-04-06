import type { Engine } from "tsparticles-engine";
import { Pusher } from "./Pusher";

export async function loadExternalPushInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalPush", (container) => new Pusher(container));
}
