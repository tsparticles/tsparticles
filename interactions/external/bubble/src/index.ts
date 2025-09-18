import { Bubbler } from "./Bubbler.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalBubbleInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

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
export type * from "./Options/Interfaces/IBubbleBase.js";
export type * from "./Options/Interfaces/IBubbleDiv.js";
export type * from "./Options/Interfaces/IBubble.js";
