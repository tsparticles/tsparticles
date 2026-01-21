import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExternalBounceInteraction(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        await loadInteractivityPlugin(e);

        e.addInteractor?.("externalBounce", async container => {
            const { Bouncer } = await import("./Bouncer.js");

            return new Bouncer(container);
        });
    });
}

export * from "./Options/Classes/Bounce.js";
export type * from "./Options/Interfaces/IBounce.js";
