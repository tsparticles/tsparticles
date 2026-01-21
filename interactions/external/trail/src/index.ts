import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalTrailInteraction(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        await loadInteractivityPlugin(e);

        e.addInteractor?.("externalTrail", async container => {
            const { TrailMaker } = await import("./TrailMaker.js");

            return new TrailMaker(container);
        });
    });
}

export * from "./Options/Classes/Trail.js";
export type * from "./Options/Interfaces/ITrail.js";
