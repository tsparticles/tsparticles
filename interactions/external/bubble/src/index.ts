import { Bubbler } from "./Bubbler";
import type { Engine } from "tsparticles-engine";

export async function loadExternalBubbleInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalBubble", (container) => new Bubbler(container));
}

export * from "./Options/Classes/BubbleBase";
export * from "./Options/Classes/BubbleDiv";
export * from "./Options/Classes/Bubble";
export * from "./Options/Interfaces/IBubbleBase";
export * from "./Options/Interfaces/IBubbleDiv";
export * from "./Options/Interfaces/IBubble";
