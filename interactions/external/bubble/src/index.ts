import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { Bubbler } from "./Bubbler.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalBubbleInteraction(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addInteractor(
        "externalBubble",
        container => {
            return Promise.resolve(new Bubbler(container, engine));
        },
        refresh,
    );
}

export * from "./Options/Classes/BubbleBase.js";
export * from "./Options/Classes/BubbleDiv.js";
export * from "./Options/Classes/Bubble.js";
export * from "./Options/Interfaces/IBubbleBase.js";
export * from "./Options/Interfaces/IBubbleDiv.js";
export * from "./Options/Interfaces/IBubble.js";
