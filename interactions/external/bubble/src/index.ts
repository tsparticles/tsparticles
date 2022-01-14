import type { Engine } from "tsparticles-engine";
import { Bubbler } from "./Bubbler";

export async function loadExternalBubbleInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalBubble", (container) => new Bubbler(container));
}
