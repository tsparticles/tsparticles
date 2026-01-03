import { Collider } from "./Collider.js";
import { type Engine } from "@tsparticles/engine";
import { OverlapPlugin } from "./OverlapPlugin.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to use for the interaction
 * @param refresh -
 */
export async function loadParticlesCollisionsInteraction(engine: Engine, refresh = true): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.addPlugin(new OverlapPlugin());
    await engine.addInteractor(
        "particlesCollisions",
        container => {
            return Promise.resolve(new Collider(container));
        },
        refresh,
    );
}
