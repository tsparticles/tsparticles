import { type Engine } from "@tsparticles/engine";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadParticlesRepulseInteraction(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.register(async (e: InteractivityEngine) => {
        const { loadInteractivityPlugin } = await import("@tsparticles/plugin-interactivity");

        await loadInteractivityPlugin(e);

        e.addInteractor?.("particlesRepulse", async container => {
            const { Repulser } = await import("./Repulser.js");

            return new Repulser(container);
        });
    });
}
