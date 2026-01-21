import type { AbsorberContainer } from "./AbsorberContainer.js";
import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadAbsorbersPlugin(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity"),
            { AbsorbersInstancesManager } = await import("./AbsorbersInstancesManager.js"),
            { AbsorbersPlugin } = await import("./AbsorbersPlugin.js"),
            instancesManager = new AbsorbersInstancesManager(e);

        loadInteractivityPlugin(e);

        e.addPlugin(new AbsorbersPlugin(instancesManager));

        e.addInteractor?.("externalAbsorbers", async container => {
            const { AbsorbersInteractor } = await import("./AbsorbersInteractor.js");

            return new AbsorbersInteractor(container as AbsorberContainer, instancesManager);
        });
    });
}

export type * from "./AbsorberContainer.js";
