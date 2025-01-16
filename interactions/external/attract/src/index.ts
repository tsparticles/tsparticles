import { Attractor } from "./Attractor.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExternalAttractInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addInteractor(
        "externalAttract",
        container => {
            return Promise.resolve(new Attractor(engine, container));
        },
        refresh,
    );
}

export * from "./Options/Classes/Attract.js";
export * from "./Options/Interfaces/IAttract.js";
